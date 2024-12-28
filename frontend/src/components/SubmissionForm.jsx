import Box from "@mui/material/Box";
import { Button, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SubmissionForm = ({ setFoodItems }) => {
  const [errors, setErrors] = useState({ foodItem: false, amount: false });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const addItem = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    const formData = new FormData(event.target);
    const foodItem = formData.get("food-item");
    const amount = formData.get("amount");

    const hasErrors = {
      foodItem: !foodItem.trim(),
      amount: !amount.trim(),
    };
    setErrors(hasErrors);

    // If any field has an error, stop form submission
    if (hasErrors.foodItem || hasErrors.amount) {
      return;
    }
    setFoodItems((prevItems) => {
      const id = Date.now();
      const updatedItems = [...prevItems, [id, foodItem.trim(), amount.trim()]];
      // Sort by the foodItem name (case-insensitive)
      return updatedItems.sort((a, b) => a[1].localeCompare(b[1]));
    });
    setMessage(`${foodItem}(${amount}) has been added`);
    setOpen(true);
    event.target.reset();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 3, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={addItem}
      >
        <div>
          <TextField
            required
            id="food-item"
            label="Food Item"
            name="food-item"
            variant="standard"
            error={errors.foodItem}
            helperText={errors.foodItem ? "Food Item is required" : ""}
          />
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount (1pcs, 0.8kg)"
            variant="standard"
            error={errors.amount}
            helperText={errors.amount ? "Amount is required" : ""}
          />
        </div>
        <Button variant="outlined" type="submit" endIcon={<AddIcon />}>
          Add
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green", // Set your desired background color
            color: "white", // Adjust text color if needed
          },
        }}
      />
    </>
  );
};

export default SubmissionForm;
