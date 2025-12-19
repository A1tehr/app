from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid


# Base model with common fields
class TimestampModel(BaseModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# News/Articles
class NewsBase(BaseModel):
    title: str
    description: str
    full_text: str
    image: str
    date: datetime = Field(default_factory=datetime.utcnow)

class NewsCreate(NewsBase):
    pass

class News(NewsBase, TimestampModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# Services
class ServiceBase(BaseModel):
    title: str
    description: str
    icon: str

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase, TimestampModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# Categories
class Subcategory(BaseModel):
    id: int
    name: str
    parent_id: int

class CategoryBase(BaseModel):
    name: str
    image: str
    product_count: int = 0
    subcategories: Optional[List[Subcategory]] = []

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase, TimestampModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# Products
class ProductSpecification(BaseModel):
    key: str
    value: str

class ProductBase(BaseModel):
    category_id: str
    name: str
    article: str
    image: str
    description: str
    specifications: Optional[List[ProductSpecification]] = []

class ProductCreate(ProductBase):
    pass

class Product(ProductBase, TimestampModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# Projects
class ProjectBase(BaseModel):
    title: str
    images: List[str]

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase, TimestampModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# User submissions
class CallbackRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    type: str = "callback"
    status: str = "new"  # new, processed, completed
    date: datetime = Field(default_factory=datetime.utcnow)

class OrderRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    comment: Optional[str] = None
    product: Optional[str] = None
    service: Optional[str] = None
    type: str = "order"
    status: str = "new"  # new, processed, completed
    date: datetime = Field(default_factory=datetime.utcnow)

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    message: str
    type: str = "contact"
    status: str = "new"  # new, processed, completed
    date: datetime = Field(default_factory=datetime.utcnow)


# Admin User
class AdminUser(BaseModel):
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    username: str
    password: str
