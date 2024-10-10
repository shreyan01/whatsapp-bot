from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from twilio.rest import Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Twilio API credentials
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')

client = Client(account_sid, auth_token)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/send-text"],  # Add your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    sender: str  # Must be a Twilio-approved WhatsApp number
    message: str  # User-defined message
    recipients: list[str]  # List of recipient WhatsApp numbers

@app.post("/send-bulk-whatsapp/")
async def send_bulk_whatsapp(request: MessageRequest):
    sender = f'whatsapp:{request.sender}'
    message_body = request.message
    recipients = request.recipients

    try:
        for recipient in recipients:
            client.messages.create(
                body=message_body,
                from_=sender,
                to=f'whatsapp:{recipient}'  # Sending message to each recipient
            )
        return {"status": "success", "detail": "Messages sent successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending messages: {str(e)}")
