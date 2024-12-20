import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SubmissionForm = ({ setFoodItems }) => {
  const [errors, setErrors] = useState({ foodItem: false, amount: false });

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
    event.target.reset();
  };

  return (
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
  );
};

export default SubmissionForm;
