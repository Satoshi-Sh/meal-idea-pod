from flask import Flask, jsonify, request
from utils import get_meal_ideas, get_recipe, get_ingredients  # Import your functions from another file or module
from flask_cors import CORS
import os 
from dotenv import load_dotenv 
import base64

load_dotenv()
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # Limit uploads to 5 MB
CORS(app, resources={r"/api/*": {"origins": [frontend_url]}})

# Configure allowed extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/meal-ideas', methods=['POST'])
async def meal_ideas():
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
async def recipe():
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



@app.route('/api/get-ingredients', methods=['POST'])
async def get_ingredients_from_image():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    
    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Read the file and encode it
        file_content = file.read()
        encoded_image = base64.b64encode(file_content).decode('utf-8')
        
        try:
            ingredients = get_ingredients(file.mimetype, encoded_image)
            return ingredients, 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'File type not allowed'}), 400


@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({"message": "All good now"}), 200

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({'error': 'File is too large. Maximum size allowed is 5 MB.'}), 413



if __name__ == '__main__':
    # Run the Flask app on localhost:5000
    app.run(debug=True,port=5000)
