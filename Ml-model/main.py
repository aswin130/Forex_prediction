from fastapi import FastAPI, File, UploadFile , HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import numpy as np
from keras.api.models import load_model

from LSTM import X_train, y_train, X_test, y_test

app = FastAPI()
model = load_model('best_lstm_model.h5')

# Load the pre-trained model
class PredictionRequest(BaseModel):
    data: list # Expecting list of floats
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_Credential=[True],
    allow_methods=['*'],
    allow_headers=["*"])
app.post("/predict/")
async def predict(request: PredictionRequest):
    try:
        # Prepare the input data
        input_data = np.array(request.data).reshape(1, -1, 1)  # Adjust the shape as needed

        # Make predictions
        prediction = model.predict(input_data)

        # Return the prediction
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


