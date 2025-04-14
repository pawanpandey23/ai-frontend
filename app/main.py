from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# Initialize FastAPI
app = FastAPI()

# Load Open-Source LLM (Llama 2 or similar)
qa_pipeline = pipeline("text2text-generation", model="google/flan-t5-base")

# Request Model
class Query(BaseModel):
    question: str
    subject: str  # Optional: Filter by subject

@app.get("/")
def root():
    return {"message": "Welcome to the AI Study Assistant"}

@app.post("/ask/")
def ask_question(query: Query):
    # Generate response using the model
    response = qa_pipeline(query.question, max_length=200, truncation=True)
    return {"answer": response[0]['generated_text']}
