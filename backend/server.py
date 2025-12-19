from fastapi import FastAPI, APIRouter, HTTPException
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


# Public content endpoints
@api_router.get("/carousel")
async def get_carousel():
    """Get carousel slides"""
    slides = await db.carousel.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return slides


@api_router.get("/advantages")
async def get_advantages():
    """Get advantages"""
    advantages = await db.advantages.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return advantages


@api_router.get("/about")
async def get_about():
    """Get about page content"""
    about = await db.about.find_one({}, {"_id": 0})
    if not about:
        return {
            "content": "Мы - команда профессионалов с многолетним опытом в сфере электромонтажных работ.",
            "mission": "",
            "vision": "",
            "values": []
        }
    return about


@api_router.get("/settings")
async def get_settings():
    """Get site settings"""
    settings = await db.settings.find_one({}, {"_id": 0})
    if not settings:
        return {
            "company_name": "ИП Рогоянов А.А.",
            "phone": "8 (916) 271-33-09",
            "email": "rogoyanov.alexy66@mail.ru",
            "address": "г. Воронеж",
            "working_hours": "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00",
            "admin_email": "rogoyanov.alexy66@mail.ru",
            "description": "Профессиональные электромонтажные работы для физических и юридических лиц."
        }
    return settings


@api_router.get("/news")
async def get_public_news():
    """Get all published news"""
    news_list = await db.news.find({}, {"_id": 0}).sort("date", -1).to_list(1000)
    return news_list


@api_router.get("/news/{news_id}")
async def get_news_by_id(news_id: str):
    """Get news by ID"""
    news = await db.news.find_one({"id": news_id}, {"_id": 0})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news


@api_router.get("/services")
async def get_public_services():
    """Get all services"""
    services = await db.services.find({}, {"_id": 0}).to_list(1000)
    return services


@api_router.get("/categories")
async def get_public_categories():
    """Get all categories"""
    categories = await db.categories.find({}, {"_id": 0}).to_list(1000)
    return categories


@api_router.get("/products")
async def get_public_products(category_id: str = None):
    """Get all products, optionally filtered by category"""
    query = {"category_id": category_id} if category_id else {}
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return products


@api_router.get("/products/{product_id}")
async def get_product_by_id(product_id: str):
    """Get product by ID"""
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@api_router.get("/projects")
async def get_public_projects():
    """Get all projects"""
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    return projects

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