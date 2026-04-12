from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .utils import risk_engine

app = FastAPI(title="Credit Risk API v2.1")

# Configure CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.get("/")
async def root():
    return {"status": "operational", "engine": "ML_v2.1"}

@app.post("/predict")
async def predict_risk(input_data: PredictionInput):
    try:
        data_dict = input_data.model_dump()
        prediction, probability = risk_engine.predict(data_dict)
        
        if prediction is None:
            raise HTTPException(status_code=500, detail="Model Engine Failure")
            
        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
