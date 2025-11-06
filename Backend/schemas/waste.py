from pydantic import BaseModel

# Defines the structure for the successful API response
class WasteClassificationResponse(BaseModel):
    # The predicted waste category (Plastic, Paper, Metal, Others)
    category: str
    # The confidence score for the prediction
    confidence: float