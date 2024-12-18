// src/pages/About.jsx
import { useState, useEffect } from "react";
import { Restaurant } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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
  useEffect(() => {
    const storedItems = localStorage.getItem("foodItems");
    if (storedItems && storedItems != "undefined") {
      setFoodItems(JSON.parse(storedItems));
    }
  }, []);

  const getIdeas = () => {
    console.log(foodItems, selectedPreferences, API_KEY);
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
      <Button
        variant="outlined"
        startIcon={<TipsAndUpdatesIcon />}
        sx={{ margin: "20px" }}
        onClick={getIdeas}
      >
        Get Ideas
      </Button>
    </div>
  );
};

export default Suggestions;
