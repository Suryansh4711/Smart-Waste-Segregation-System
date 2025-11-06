from fastapi import FastAPI
import uvicorn

# Initialize the FastAPI application
app = FastAPI(
    title="Smart Waste Segregation API",
    description="Backend for image-based waste classification.",
    version="1.0.0"
)

# --- Include Routers Here (will be done in Phase 3) ---

# Basic health check endpoint
@app.get("/", tags=["Root"])
def read_root():
    # Returns a simple JSON response to confirm the API is running
    return {"message": "Smart Waste Segregation API is online!"}
# --- Imports from Phase 1 remain ---
from tensorflow.keras.models import load_model # Assuming TensorFlow/Keras
from PIL import Image
import numpy as np
import os # To read model path

app = FastAPI(...)
# Global variable to hold the loaded model
ML_MODEL = None
# Define the 4 classification categories
CLASS_LABELS = ["Plastic", "Paper", "Metal", "Others"] # Matches report [cite: 26, 83]
IMAGE_SIZE = (224, 224) # Standard input size for ResNet50

@app.on_event("startup")
async def load_ml_model():
    global ML_MODEL
    try:
        # Load the model from the specified path
        model_path = os.getenv("ML_MODEL_PATH", "./models/resnet50_waste_classifier.h5")
        ML_MODEL = load_model(model_path)
        print(f"Successfully loaded ML model from: {model_path}")
    except Exception as e:
        # Crucial for deployment; stop if model fails to load
        print(f"ERROR: Failed to load ML model: {e}")
        ML_MODEL = None

# --- Imports from Phase 2 remain ---
from routers import classification # Import the router

app = FastAPI(...)
# ... (load_ml_model function remains)

# Include the classification router
app.include_router(classification.router)

# ... (read_root function remains)
# ... (read_root function remains)

# Optional: Run the server locally (For development testing)
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)