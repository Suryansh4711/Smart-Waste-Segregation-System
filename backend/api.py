from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import tensorflow as tf
import uvicorn
from tensorflow.keras.applications.efficientnet import preprocess_input

MODEL_PATH = "waste_model.h5"
IMG_SIZE = 224

model = tf.keras.models.load_model(MODEL_PATH)
CLASS_NAMES = ["bio-degradable", "non-biodegradable"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def preprocess(image):
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    input_tensor = preprocess(image)
    prediction = model.predict(input_tensor)
    class_name = CLASS_NAMES[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return {
        "prediction": class_name,
        "confidence": confidence
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
