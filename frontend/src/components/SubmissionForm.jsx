import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const SubmissionForm = ({ setFoodItems }) => {
  const addItem = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    const formData = new FormData(event.target);
    const foodItem = formData.get("food-item");
    const amount = formData.get("amount");
    setFoodItems((prevItems) => [...prevItems, [foodItem, amount]]);
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
          id="standard-required"
          label="Food Item"
          name="food-item"
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          name="amount"
          label="Amount (1pcs, 0.8kg)"
          variant="standard"
        />
      </div>
      <Button variant="outlined" type="submit" endIcon={<AddIcon />}>
        Add
      </Button>
    </Box>
  );
};

export default SubmissionForm;
