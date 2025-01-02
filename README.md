## Overview for the Meal Idea Pod

This project is a simple implementation of a meal suggestion system from food list using a language model. The system store food items and suggest meal idea and provide a recipe by preference.

## Key Features

- Users can track food items to the app by typing and uploading receipt images.
- The app suggest meal ideas by user preference(food cateries)
- The app also shows the meal recipe for selected number of people

## Run Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open http://localhost:5173/

## Run Backend

1. `cd backend`
2. Set up the .env file according to the .sample_env. You need to add your OPENAI_API_KEY.
3. Install dependencies to your environment `pip install -r requirements.txt`
4. `python app.py`
