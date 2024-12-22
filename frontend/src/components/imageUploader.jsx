import React, { useState, useRef } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import { PhotoCamera, Upload } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/HighlightOff";
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api_base_url =
    import.meta.env.VITE_API_BASE_URL != ""
      ? import.meta.env.VITE_API_BASE_URL
      : "http://localhost:5000";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.onerror = () =>
        setError("Failed to read the file. Please try again.");
      reader.readAsDataURL(file);
    }
  };
  const handleCameraCapture = async () => {
    try {
      // Request access to the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Ensure the `video` element is ready
      setShowCamera(true); // Trigger the rendering of the `video` element

      // Wait for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the stream
        videoRef.current.play(); // Start video playback
        setError(null);
      } else {
        setError("Camera element not available. Please try again.");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        `Failed to access the camera: ${err.message}. Please check your permissions or try another device.`
      );
      setShowCamera(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setSelectedImage(canvas.toDataURL("image/jpeg"));
      }
      // Stop the camera stream after capturing the image
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setShowCamera(false);
    } else {
      setError("Camera stream not available. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError("Please select or capture an image first");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData and append the image
      const formData = new FormData();
      if (fileInputRef.current.files.length > 0) {
        // For file upload, use original file with its extension
        formData.append("file", fileInputRef.current.files[0]);
      } else {
        // For camera capture, detect format from base64
        const format = selectedImage.split(";")[0].split("/")[1];
        const base64Response = await fetch(selectedImage);
        const blob = await base64Response.blob();
        formData.append("file", blob, `image.${format}`);
      }

      // Send to Flask endpoint
      const response = await fetch(`${api_base_url}/api/get-ingredients`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Handle successful response (e.g., show success message, redirect, etc.)
      setError(null);
      // Reset the form if needed
      setSelectedImage(null);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error:", err);
      setError(`Failed to submit image: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      // Stop all tracks of the media stream
      stream.getTracks().forEach((track) => track.stop());
      // Clear the video source
      videoRef.current.srcObject = null;
    }
    // Hide the camera interface
    setShowCamera(false);
  };
  return (
    <div className="flex flex-col items-center space-y-4 m-6 rounded-lg">
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      {!selectedImage && !showCamera ? (
        <>
          <h4 className="italic font-thin">Upload a receipt image</h4>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              startIcon={<Upload />}
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Select Image
            </Button>
            <IconButton
              color="primary"
              aria-label="capture picture"
              onClick={handleCameraCapture}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <PhotoCamera />
            </IconButton>
          </div>
        </>
      ) : null}

      {showCamera && (
        <div className="mt-4">
          <div className="w-80">
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-96 mb-2 rounded-lg object-cover"
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={captureImage}
              className="bg-red-500 hover:bg-red-600"
            >
              Capture
            </Button>
            <IconButton onClick={stopCamera} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )}
      {selectedImage && (
        <>
          <div className="mt-4 h-96 w-80">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={<AddIcon />}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setSelectedImage(null);
                fileInputRef.current.value = "";
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
    </div>
  );
};

export default ImageUploader;
