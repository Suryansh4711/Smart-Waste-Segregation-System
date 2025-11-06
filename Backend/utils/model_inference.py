from PIL import Image
import numpy as np
import io

IMAGE_SIZE = (224, 224)

def preprocess_image(file_content: bytes) -> np.ndarray:
    """Preprocesses a raw image byte stream for ResNet50 input."""
    # 1. Open image from bytes using PIL
    image = Image.open(io.BytesIO(file_content)).convert("RGB")
    # 2. Resize image
    image = image.resize(IMAGE_SIZE)
    # 3. Convert to numpy array
    image_array = np.asarray(image)
    # 4. Normalize (ResNet50 models often expect normalization)
    image_array = image_array / 255.0  # Basic normalization
    # 5. Expand dimensions to create a batch (1, H, W, C)
    return np.expand_dims(image_array, axis=0)


def predict_waste_category(model, preprocessed_image: np.ndarray, labels: list) -> tuple:
    """Performs inference and returns the predicted category and confidence."""
    if model is None:
        raise RuntimeError("ML model is not loaded.")

    # Get predictions
    predictions = model.predict(preprocessed_image)[0]
    # Find the index with the highest probability
    predicted_index = np.argmax(predictions)
    # Get the confidence score
    confidence = float(predictions[predicted_index])
    # Map index to the label
    category = labels[predicted_index]

    return category, confidence