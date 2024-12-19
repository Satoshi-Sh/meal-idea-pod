// src/pages/About.jsx
import { useState, useEffect } from "react";
import { Restaurant } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const api_base_url =
  import.meta.env.VITE_API_BASE_URL != ""
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:5000";

const Suggestions = () => {
  const preferences = [
    "African",
    "American",
    "Argentinian",
    "Brazilian",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Ethiopian",
    "Filipino",
    "French",
    "German",
    "Greek",
    "Indian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Lebanese",
    "Mediterranean",
    "Mexican",
    "Moroccan",
    "Pakistani",
    "Peruvian",
    "Russian",
    "Snack",
    "Spanish",
    "Thai",
    "Turkish",
    "Vietnamese",
  ];
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [mealIdeas, setMealIdeas] = useState([]);
  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems");
    if (storedItems && storedItems != "undefined") {
      setFoodItems(JSON.parse(storedItems));
    }
  }, []);
  const getIdeas = async () => {
    // Prepare the ingredients list and preferences
    const ingredients = foodItems.map((item) => [item[1], item[2]]);

    try {
      const response = await fetch(`${api_base_url}/api/meal-ideas`, {
        method: "POST", // Change to POST if you're sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients,
          preferences: selectedPreferences,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setMealIdeas(data.meal_plans);
      } else {
        console.error("Error fetching meal ideas:", response.status);
      }
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
    }
  };

  const handleToggle = (event, newPreferences) => {
    setSelectedPreferences(newPreferences);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl italic font-thin m-3">Preference</h1>
        <Restaurant className="my-auto" />
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
        <ToggleButtonGroup
          value={selectedPreferences}
          onChange={handleToggle}
          aria-label="preferences"
          sx={{ placeItems: "center", flexWrap: "wrap", width: "90%" }}
        >
          {preferences.map((preference) => (
            <ToggleButton
              key={preference}
              value={preference}
              aria-label={preference}
              sx={{
                flex: "1 1 20%",
                width: "20%",
                minWidth: "140px",
                textAlign: "center", // Center text alignment
              }}
            >
              {preference}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      {foodItems.length > 0 && selectedPreferences.length > 0 ? (
        <Button
          variant="outlined"
          startIcon={<TipsAndUpdatesIcon />}
          sx={{ margin: "20px" }}
          onClick={getIdeas}
        >
          Get Ideas
        </Button>
      ) : foodItems.length === 0 ? (
        <p className="m-5">Please add items first...</p>
      ) : (
        <p className="m-5">Please choose preferences...</p>
      )}

      <div>
        {mealIdeas.length > 0 && (
          <div>
            <h2 className="text-3xl italic font-thin m-5">Meal Suggestions</h2>
            <ul>
              {mealIdeas.map((idea, index) => (
                <li key={index}>
                  {idea.name} {idea.ease_of_cooking} {idea.category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
