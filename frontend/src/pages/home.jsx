import { useState } from "react";
import IngredientList from "../components/IngredientList";
import { Restaurant } from "@mui/icons-material";
import SubmissionForm from "../components/SubmissionForm";
const Home = () => {
  // Array of food ingredients
  const ingredients = [
    ["Tomatoes", "4pcs"],
    ["Onions", "5pcs"],
    ["Garlic", "5pcs"],
    ["Olive Oil", "1bottle"],
    ["Salt", "1box"],
    ["Pepper", "3pcs"],
    ["Basil", "1package"],
    ["Parmesan Cheese", "1bottle"],
  ];
  const [foodItems, setFoodItems] = useState(ingredients);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl italic font-thin m-3">Meal Idea Pod</h1>
        <Restaurant className="my-auto" />
      </div>
      <SubmissionForm setFoodItems={setFoodItems} />
      <IngredientList foodItems={foodItems} />
    </div>
  );
};

export default Home;
