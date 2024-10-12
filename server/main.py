from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from twilio.rest import Client
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Twilio API credentials
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')

client = Client(account_sid, auth_token)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    sender: str  # Customer's registered WhatsApp number or Twilio sandbox number
    message: str  # User-defined message
    recipients: list[str]  # List of recipient WhatsApp numbers

@app.post("/send-bulk-whatsapp/")
async def send_bulk_whatsapp(request: MessageRequest):
    sender_number = request.sender
    recipients = request.recipients
    message_body = request.message

    # Use Twilio's WhatsApp sandbox number for testing
    twilio_sandbox_number = "whatsapp:+14155238886"  # Replace with actual Twilio number for production
    use_sandbox = os.getenv("TWILIO_USE_SANDBOX", "true") == "true"  # Default to true in .env

    # If in sandbox, enforce the Twilio sandbox number as sender
    if use_sandbox:
        logger.info("Using Twilio sandbox number for sender")
        sender_number = twilio_sandbox_number
    else:
        sender_number = f"whatsapp:{sender_number}"

    try:
        for recipient in recipients:
            recipient_number = f"whatsapp:{recipient}"
            try:
                # Sending the message using Twilio API
                message = client.messages.create(
                    body=message_body,
                    from_=sender_number,
                    to=recipient_number
                )
                logger.info(f"Message sent successfully to {recipient}. SID: {message.sid}")
            except Exception as e:
                logger.error(f"Error sending message to {recipient}: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Error sending to {recipient}: {str(e)}")

        return {"status": "success", "detail": "Messages sent successfully!"}

    except Exception as e:
        logger.exception("Error in send_bulk_whatsapp:")
        raise HTTPException(status_code=500, detail=f"Error sending messages: {str(e)}")

