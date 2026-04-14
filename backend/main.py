from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .utils import risk_engine

import os

app = FastAPI(title="Credit Risk API v2.1")

# Configure CORS using environment variables for production
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
allowed_origins = [origin.strip().rstrip("/") for origin in raw_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
  age: int
  income: float
  loanAmount: float
  creditScore: int
  employmentYears: int
  educationLevel: str
  housingStatus: str
  modelType: str = "Logistic Regression"

@app.get("/")
async def root():
    return {"status": "operational", "engine": "ML_v2.1"}

@app.post("/predict")
async def predict_risk(input_data: PredictionInput):
    try:
        data_dict = input_data.model_dump()
        model_name = data_dict.pop('modelType')
        
        # Robust validation of modelType
        if model_name not in risk_engine.models:
            available = list(risk_engine.models.keys())
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid modelType '{model_name}'. Available models: {available}"
            )
            
        prediction, probability = risk_engine.predict(data_dict, model_name=model_name)
        
        if prediction is None:
            raise HTTPException(status_code=500, detail="Prediction Engine failure")
            
        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=host, port=port)
