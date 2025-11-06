from fastapi import APIRouter, UploadFile, File, HTTPException
from starlette.requests import Request

# Import from schemas and utilities
from schemas.waste import WasteClassificationResponse
from utils.model_inference import preprocess_image, predict_waste_category

router = APIRouter(
    prefix="/classify",
    tags=["Classification"]
)

@router.post("/", response_model=WasteClassificationResponse)
async def classify_waste_image(
    # Use File dependency to handle the uploaded file
    file: UploadFile = File(..., description="Image file (JPG or PNG) of the waste item.")
):
    # 1. Input Validation: Check file type (optional but good practice)
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG/PNG supported.")

    # 2. Read the image content
    try:
        file_content = await file.read()
    except Exception:
        raise HTTPException(status_code=500, detail="Could not read file content.")

    # 3. Preprocess and Predict
    try:
        # Access the globally loaded model and labels from the main app state
        # (This requires passing them from main.py, often via request.app.state)
        # For simplicity, we'll assume the main app passes the necessary state:
        # In a real app: model = request.app.state.ML_MODEL
        # For this example, we assume we can access ML_MODEL and CLASS_LABELS globally
        # (This is a simplified approach for demonstration)

        from main import ML_MODEL, CLASS_LABELS # Simplified access

        preprocessed_image = preprocess_image(file_content)
        category, confidence = predict_waste_category(
            ML_MODEL, preprocessed_image, CLASS_LABELS
        )
    except RuntimeError as e:
         # Model failed to load (from Phase 2 startup)
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        # Handle general ML or image processing errors
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail="Classification failed due to an internal processing error.")

    # 4. Return the structured response
    return WasteClassificationResponse(
        category=category,
        confidence=confidence
    )