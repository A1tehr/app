import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)


def send_email(subject: str, body: str, to_email: str = None):
    """Send email using Yandex SMTP"""
    
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    # If SMTP is not configured, just log and return
    if not smtp_user or not smtp_password:
        logger.warning("SMTP not configured. Email not sent.")
        logger.info(f"Email would be sent:\nSubject: {subject}\nBody: {body}")
        return True
    
    if to_email is None:
        to_email = os.environ.get('ADMIN_EMAIL', 'rogoyanov.alexy66@mail.ru')
    
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', 465))
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add body
        msg.attach(MIMEText(body, 'html', 'utf-8'))
        
        # Send email
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


def send_callback_notification(name: str, phone: str):
    """Send notification for callback request"""
    subject = "Новая заявка на обратный звонок - ИП Рогоянов"
    body = f"""
    <html>
    <body>
        <h2>Новая заявка на обратный звонок</h2>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <hr>
        <p style="color: gray; font-size: 12px;">Сообщение отправлено с сайта ИП Рогоянов А.А.</p>
    </body>
    </html>
    """
    return send_email(subject, body)


def send_order_notification(name: str, email: str, phone: str, comment: str = "", 
                           product: str = None, service: str = None):
    """Send notification for order request"""
    subject = "Новый заказ - ИП Рогоянов"
    
    item_info = ""
    if product:
        item_info = f"<p><strong>Продукт:</strong> {product}</p>"
    elif service:
        item_info = f"<p><strong>Услуга:</strong> {service}</p>"
    
    body = f"""
    <html>
    <body>
        <h2>Новая заявка на заказ</h2>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        {item_info}
        {f'<p><strong>Комментарий:</strong> {comment}</p>' if comment else ''}
        <hr>
        <p style="color: gray; font-size: 12px;">Сообщение отправлено с сайта ИП Рогоянов А.А.</p>
    </body>
    </html>
    """
    return send_email(subject, body)


def send_contact_notification(name: str, phone: str, email: str, message: str):
    """Send notification for contact message"""
    subject = "Новое сообщение с формы обратной связи - ИП Рогоянов"
    body = f"""
    <html>
    <body>
        <h2>Новое сообщение с формы обратной связи</h2>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background: #f5f5f5; padding: 10px; border-left: 3px solid #ff6600;">{message}</p>
        <hr>
        <p style="color: gray; font-size: 12px;">Сообщение отправлено с сайта ИП Рогоянов А.А.</p>
    </body>
    </html>
    """
    return send_email(subject, body)
