# backend/email_service.py

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging

load_dotenv() 

EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_SERVER = os.getenv("EMAIL_SERVER")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True").lower() == "true"
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://aiacademy2025.netlify.app") 

logger = logging.getLogger("ai_academy")

async def send_confirmation_email(recipient_email: str, username: str, confirmation_token: str):
    if not (EMAIL_USERNAME and EMAIL_PASSWORD and EMAIL_SERVER):
        logger.error("Configurações de e-mail incompletas. Não é possível enviar e-mail de confirmação.")
        return

    subject = "Confirme sua conta no AI Academy"
    confirmation_link = f"{FRONTEND_URL}/confirm-account?token={confirmation_token}"

    body = f"""
    <html>
    <body>
        <p>Olá, {username}!</p>
        <p>Obrigado por se registrar no AI Academy.</p>
        <p>Por favor, clique no link abaixo para confirmar sua conta:</p>
        <p><a href="{confirmation_link}">Confirmar Minha Conta</a></p>
        <p>Se você não se registrou no AI Academy, pode ignorar este e-mail.</p>
        <p>Atenciosamente,</p>
        <p>A equipe AI Academy</p>
    </body>
    </html>
    """

    message = MIMEMultipart("alternative")
    message["From"] = EMAIL_USERNAME
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))

    try:
        server = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT)
        if EMAIL_USE_TLS:
            server.starttls()
        server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USERNAME, recipient_email, message.as_string())
        server.quit()
        logger.info(f"E-mail de confirmação enviado para {recipient_email}")
    except Exception as e:
        logger.error(f"Falha ao enviar e-mail de confirmação para {recipient_email}: {e}")
        import traceback
        logger.error(traceback.format_exc())