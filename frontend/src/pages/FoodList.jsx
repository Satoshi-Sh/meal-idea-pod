import { useState, useEffect } from "react";
import IngredientList from "../components/IngredientList";
import { Restaurant } from "@mui/icons-material";
import SubmissionForm from "../components/SubmissionForm";
import ImageUploader from "../components/imageUploader";
const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems");
    if (storedItems && storedItems != "undefined") {
      setFoodItems(JSON.parse(storedItems));
    }
  }, []);
  useEffect(() => {
    if (foodItems.length > 0) {
      localStorage.setItem("foodItems", JSON.stringify(foodItems));
    } else {
      localStorage.removeItem("foodItems");
    }
  }, [foodItems]);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl italic font-thin m-5">Meal Idea Pod</h1>
        <Restaurant className="my-auto" />
      </div>
      <SubmissionForm setFoodItems={setFoodItems} />
      <ImageUploader setFoodItems={setFoodItems} />
      <IngredientList foodItems={foodItems} setFoodItems={setFoodItems} />
    </div>
  );
};

export default Home;
