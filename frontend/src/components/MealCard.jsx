import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  Box,
  DialogContent,
  DialogActions,
} from "@mui/material";
const api_base_url =
  import.meta.env.VITE_API_BASE_URL != ""
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:5000";

const MealCard = ({ name, easeOfCooking, category, foodItems }) => {
  const [open, setOpen] = useState(false);
  const [recipeMarkdown, setRecipeMarkdown] = useState("");

  const getRecipe = async () => {
    // Prepare the ingredients list and preferences
    const ingredients = foodItems.map((item) => [item[1], item[2]]);
    try {
      const response = await fetch(`${api_base_url}/api/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          ingredients: ingredients,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.recipe);
        setRecipeMarkdown(data.recipe);
      } else {
        console.error("Error fetching recipe:", response.status);
      }
    } catch (error) {
      console.error("Error fetching meal recipe:", error);
    }
  };

  const handleClickOpen = () => {
    getRecipe();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ m: 5 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ease of Cooking: {easeOfCooking}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="medium" onClick={handleClickOpen}>
          View Recipe
        </Button>
      </CardActions>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent class="react-markdown">
          <ReactMarkdown>{recipeMarkdown}</ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MealCard;
