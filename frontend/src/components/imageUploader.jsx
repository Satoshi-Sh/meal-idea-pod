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
      canvas.width = videoRef.current.videoWidth || 640; // Default fallback
      canvas.height = videoRef.current.videoHeight || 480; // Default fallback
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
      {showCamera && (
        <div className="mt-4">
          <video ref={videoRef} autoPlay className="mb-2 rounded-lg" />
          <Button
            variant="contained"
            onClick={captureImage}
            className="bg-red-500 hover:bg-red-600"
          >
            Capture
          </Button>
          <IconButton onClick={() => setShowCamera(false)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {selectedImage && (
        <div className="mt-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
          <Button variant="outlined" endIcon={<AddIcon />}>
            Submit
          </Button>
          <Button
            variant="outlined"
            color="error"
            endIcon={<AddIcon />}
            onClick={stopCamera}
          >
            Cancel
          </Button>
        </div>
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
