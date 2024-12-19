from flask import Flask, jsonify, request
from utils import get_meal_ideas, get_recipe  # Import your functions from another file or module
from flask_cors import CORS
import os 
from dotenv import load_dotenv 

load_dotenv()
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": frontend_url}})


@app.route('/api/meal-ideas', methods=['POST'])
def meal_ideas():
    try:
        # Get the JSON data from the request body
        data = request.get_json()

        # Extract ingredients and preferences from the JSON data
        ingredients = data.get('ingredients', [])
        preferences = data.get('preferences', {})

        # Call the function to get meal ideas
        meal_ideas = get_meal_ideas(ingredients, preferences)

        # Return the meal ideas as JSON
        return meal_ideas, 200

    except Exception as e:
        # If any error occurs, return an error message
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/recipe', methods=['POST'])
def recipe():
    try:
        # Get the JSON data from the request body
        data = request.get_json()

        # Extract meal name and ingredients
        name = data.get('name')
        ingredients = data.get('ingredients', [])

        # Call the function to get the recipe
        recipe = get_recipe(name, ingredients)

        # Return the recipe as JSON
        return jsonify({"recipe": recipe}), 200

    except Exception as e:
        # If any error occurs, return an error message
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on localhost:5000
    app.run(debug=True,port=5000)
