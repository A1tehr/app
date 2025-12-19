from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from models import (
    News, NewsCreate, Service, ServiceCreate, Category, CategoryCreate,
    Product, ProductCreate, Project, ProjectCreate,
    CallbackRequest, OrderRequest, ContactMessage,
    AdminLogin
)
from motor.motor_asyncio import AsyncIOMotorDatabase
import os
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours


def get_db():
    from server import db
    return db


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


# ==================== AUTH ====================
@router.post("/login")
async def admin_login(credentials: AdminLogin, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Admin login"""
    admin = await db.admins.find_one({"username": credentials.username})
    
    # Create default admin if no admins exist
    if not admin:
        if credentials.username == "admin" and credentials.password == "admin123":
            hashed_password = pwd_context.hash(credentials.password)
            await db.admins.insert_one({
                "username": "admin",
                "password_hash": hashed_password,
                "created_at": datetime.utcnow()
            })
            token = create_access_token({"sub": credentials.username})
            return {"access_token": token, "token_type": "bearer"}
    
    if not admin or not pwd_context.verify(credentials.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    token = create_access_token({"sub": credentials.username})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/verify")
async def verify_admin(username: str = Depends(verify_token)):
    """Verify admin token"""
    return {"username": username, "authenticated": True}


# ==================== NEWS ====================
@router.get("/news", response_model=List[News])
async def get_all_news(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all news"""
    news_list = await db.news.find().sort("date", -1).to_list(1000)
    return [News(**item) for item in news_list]


@router.post("/news", response_model=News)
async def create_news(news: NewsCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Create news"""
    news_obj = News(**news.dict())
    await db.news.insert_one(news_obj.dict())
    return news_obj


@router.put("/news/{news_id}", response_model=News)
async def update_news(news_id: str, news: NewsCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update news"""
    news_obj = News(id=news_id, **news.dict())
    news_obj.updated_at = datetime.utcnow()
    await db.news.update_one({"id": news_id}, {"$set": news_obj.dict()})
    return news_obj


@router.delete("/news/{news_id}")
async def delete_news(news_id: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Delete news"""
    result = await db.news.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "News deleted successfully"}


# ==================== SERVICES ====================
@router.get("/services", response_model=List[Service])
async def get_all_services(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all services"""
    services = await db.services.find().to_list(1000)
    return [Service(**item) for item in services]


@router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Create service"""
    service_obj = Service(**service.dict())
    await db.services.insert_one(service_obj.dict())
    return service_obj


@router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service: ServiceCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update service"""
    service_obj = Service(id=service_id, **service.dict())
    service_obj.updated_at = datetime.utcnow()
    await db.services.update_one({"id": service_id}, {"$set": service_obj.dict()})
    return service_obj


@router.delete("/services/{service_id}")
async def delete_service(service_id: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Delete service"""
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}


# ==================== CATEGORIES ====================
@router.get("/categories", response_model=List[Category])
async def get_all_categories(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all categories"""
    categories = await db.categories.find().to_list(1000)
    return [Category(**item) for item in categories]


@router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Create category"""
    category_obj = Category(**category.dict())
    await db.categories.insert_one(category_obj.dict())
    return category_obj


@router.put("/categories/{category_id}", response_model=Category)
async def update_category(category_id: str, category: CategoryCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update category"""
    category_obj = Category(id=category_id, **category.dict())
    category_obj.updated_at = datetime.utcnow()
    await db.categories.update_one({"id": category_id}, {"$set": category_obj.dict()})
    return category_obj


@router.delete("/categories/{category_id}")
async def delete_category(category_id: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Delete category"""
    result = await db.categories.delete_one({"id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}


# ==================== PRODUCTS ====================
@router.get("/products", response_model=List[Product])
async def get_all_products(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all products"""
    products = await db.products.find().to_list(1000)
    return [Product(**item) for item in products]


@router.post("/products", response_model=Product)
async def create_product(product: ProductCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Create product"""
    product_obj = Product(**product.dict())
    await db.products.insert_one(product_obj.dict())
    return product_obj


@router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update product"""
    product_obj = Product(id=product_id, **product.dict())
    product_obj.updated_at = datetime.utcnow()
    await db.products.update_one({"id": product_id}, {"$set": product_obj.dict()})
    return product_obj


@router.delete("/products/{product_id}")
async def delete_product(product_id: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Delete product"""
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}


# ==================== PROJECTS ====================
@router.get("/projects", response_model=List[Project])
async def get_all_projects(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all projects"""
    projects = await db.projects.find().to_list(1000)
    return [Project(**item) for item in projects]


@router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Create project"""
    project_obj = Project(**project.dict())
    await db.projects.insert_one(project_obj.dict())
    return project_obj


@router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectCreate, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update project"""
    project_obj = Project(id=project_id, **project.dict())
    project_obj.updated_at = datetime.utcnow()
    await db.projects.update_one({"id": project_id}, {"$set": project_obj.dict()})
    return project_obj


@router.delete("/projects/{project_id}")
async def delete_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Delete project"""
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}


# ==================== USER SUBMISSIONS ====================
@router.get("/callbacks", response_model=List[CallbackRequest])
async def get_all_callbacks(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all callback requests"""
    callbacks = await db.callbacks.find().sort("date", -1).to_list(1000)
    return [CallbackRequest(**item) for item in callbacks]


@router.put("/callbacks/{callback_id}/status")
async def update_callback_status(callback_id: str, status: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update callback status"""
    await db.callbacks.update_one({"id": callback_id}, {"$set": {"status": status}})
    return {"message": "Status updated"}


@router.get("/orders", response_model=List[OrderRequest])
async def get_all_orders(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all orders"""
    orders = await db.orders.find().sort("date", -1).to_list(1000)
    return [OrderRequest(**item) for item in orders]


@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update order status"""
    await db.orders.update_one({"id": order_id}, {"$set": {"status": status}})
    return {"message": "Status updated"}


@router.get("/messages", response_model=List[ContactMessage])
async def get_all_messages(db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Get all contact messages"""
    messages = await db.messages.find().sort("date", -1).to_list(1000)
    return [ContactMessage(**item) for item in messages]


@router.put("/messages/{message_id}/status")
async def update_message_status(message_id: str, status: str, db: AsyncIOMotorDatabase = Depends(get_db), _: str = Depends(verify_token)):
    """Update message status"""
    await db.messages.update_one({"id": message_id}, {"$set": {"status": status}})
    return {"message": "Status updated"}
