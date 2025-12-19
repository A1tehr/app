from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Import admin routes
from admin_routes import router as admin_router


# Import email utilities
from email_utils import send_callback_notification, send_order_notification, send_contact_notification

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Public form models
class CallbackSubmit(BaseModel):
    name: str
    phone: str

class OrderSubmit(BaseModel):
    name: str
    email: str
    phone: str
    comment: str = ""
    product: str = None
    service: str = None

class ContactSubmit(BaseModel):
    name: str
    phone: str
    email: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Public form endpoints
@api_router.post("/callback")
async def submit_callback(data: CallbackSubmit):
    """Submit callback request"""
    callback_data = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "phone": data.phone,
        "type": "callback",
        "status": "new",
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.callbacks.insert_one(callback_data)
    
    # Send email notification
    send_callback_notification(data.name, data.phone)
    
    return {"message": "Callback request submitted successfully"}


@api_router.post("/order")
async def submit_order(data: OrderSubmit):
    """Submit order request"""
    order_data = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "phone": data.phone,
        "comment": data.comment,
        "product": data.product,
        "service": data.service,
        "type": "order",
        "status": "new",
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.orders.insert_one(order_data)
    
    # Send email notification
    send_order_notification(
        data.name, data.email, data.phone, 
        data.comment, data.product, data.service
    )
    
    return {"message": "Order submitted successfully"}


@api_router.post("/contact")
async def submit_contact(data: ContactSubmit):
    """Submit contact message"""
    message_data = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "phone": data.phone,
        "email": data.email,
        "message": data.message,
        "type": "contact",
        "status": "new",
        "date": datetime.now(timezone.utc).isoformat()
    }
    
    await db.messages.insert_one(message_data)
    
    # Send email notification
    send_contact_notification(data.name, data.phone, data.email, data.message)
    
    return {"message": "Contact message submitted successfully"}

# Include the router in the main app
app.include_router(api_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()