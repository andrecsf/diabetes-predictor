from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic import BaseModel, Field
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("modelo_diabetes_rf.pkl")  # ajuste o nome se necessário

class DadosPaciente(BaseModel):
    gestacoes: float = Field(..., ge=0, le=20)
    glicose: float = Field(..., ge=40, le=300)
    pressao_arterial: float = Field(..., ge=40, le=200)
    espessura_pele: float = Field(..., ge=5, le=100)
    insulina: float = Field(..., ge=2, le=900)
    imc: float = Field(..., ge=15, le=70)
    historico_familiar: float = Field(..., ge=0, le=3)
    idade: float = Field(..., ge=1, le=120)

@app.post("/predict")
def predict(dados: DadosPaciente):
    features = np.array([[
        dados.gestacoes, dados.glicose, dados.pressao_arterial,
        dados.espessura_pele, dados.insulina, dados.imc,
        dados.historico_familiar, dados.idade
    ]])
    resultado = model.predict(features)[0]
    probabilidade = model.predict_proba(features)[0][1]
    return {
        "resultado": int(resultado),
        "probabilidade": round(float(probabilidade), 4)
    }