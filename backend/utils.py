from openai import OpenAI 
from pydantic import BaseModel 
import json 
import os 
from dotenv import load_dotenv 
from typing import Literal

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class MealIdea(BaseModel):
    name: str
    ease_of_cooking: Literal["Easy", "Medium", "Hard"]
    category: str
class MealIdeaList(BaseModel):
    meal_plans: list[MealIdea]

def get_meal_ideas(ingredients,preferences):
    prompt = {
        "ingredients":ingredients,
        "preferences":preferences
    }
    completion = client.beta.chat.completions.parse(
    model="gpt-4o",
    temperature=0.6,
    messages=[
        {"role": "system","content":"You will get ingedient list and preferences from the user. Please make some meal suggestion and also sort by cooking_time from easy to hard."},
        {"role": "user", "content": json.dumps(prompt)}
    ],
    response_format=MealIdeaList,
)

    response_object = completion.choices[0].message.parsed
    print(json.dumps(json.loads(response_object.json()), indent=2))
    return response_object.json()


def get_recipe(name,ingredients):
    prompt = {
        "name":name,
        "ingredients":ingredients,
    }
    completion = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    temperature=0.2,
    
    messages=[
        {
    "role": "system",
    "content": """You will get a meal name and ingredients. 
                  Please create a recipe for the meal using the available ingredients for 1 person. 
                  Ensure to include the exact amounts and measurements of each ingredient in the recipe instructions.
                  The recipe should:
                  1. Use the ingredients provided with their specified amounts.
                  2. Include optional ingredients if they are used in the recipe.
                  3. Specify amounts for optional side ingredients only if they are included in the recipe.
                  4. Format the recipe in markdown, with headings, a list of ingredients with exact amounts, and clear, concise steps.
                  For example:
                  - If the ingredients are '2 chicken breasts', '1 tbsp olive oil', and '1 tsp paprika', the recipe should state:
                    "1. Preheat your oven to 180°C (350°F)."
                    "2. Rub the chicken breasts with 1 tbsp of olive oil and sprinkle 1 tsp paprika."
                    "3. Bake the chicken for 25 minutes or until cooked through."
                  - Do not include ingredients that are not used in the recipe."""
},

        {"role": "user", "content": json.dumps(prompt)}
    ],
    )
    content = completion.choices[0].message.content
    print(content)
    return content

