from thompsonSampling import ThompsonSampling
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

class Arm(BaseModel):
    id: int
    success: int
    failures: int

class ArmsRequest(BaseModel):
    arms: list[Arm] 

@app.post("/bestArm")
def call_arm(request: ArmsRequest):
    print(request.arms)
    ts = ThompsonSampling()
    best_arm = ts.choose_arm(request.arms)
    return best_arm