# backend/email_service.py (ATUALIZADO PARA SENDGRID)

import os
import logging
from dotenv import load_dotenv
from pathlib import Path
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Carrega o .env a partir da pasta 'backend'
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env") 

# Pega o logger definido no main.py
logger = logging.getLogger("ai_academy")

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
# Este é o e-mail que você verificou no SendGrid (Single Sender Verification)
FROM_EMAIL = os.getenv("EMAIL_USERNAME") 

def send_confirmation_email(recipient_email: str, username: str, confirmation_token: str, frontend_url: str):
    
    if not SENDGRID_API_KEY or not FROM_EMAIL:
        logger.error("SENDGRID_API_KEY ou EMAIL_USERNAME (From Email) não configurados. E-mail de confirmação não será enviado.")
        return

    confirmation_link = f"{frontend_url}/confirm-account?token={confirmation_token}"

    # Conteúdo HTML do e-mail
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Olá, <strong>{username}</strong>!</p>
        <p>Obrigado por se registrar no AI Academy.</p>
        <p>Por favor, clique no botão abaixo para confirmar sua conta:</p>
        <p style="margin: 25px 0;">
            <a href="{confirmation_link}" 
               style="padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Confirmar Minha Conta
            </a>
        </p>
        <p>Se você não se registrou no AI Academy, pode ignorar este e-mail.</p>
        <p>Atenciosamente,<br>A equipe AI Academy</p>
    </body>
    </html>
    """
    
    # Cria o objeto de e-mail do SendGrid
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=recipient_email,
        subject='Confirme sua conta no AI Academy',
        html_content=html_content
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        # sg.send() é síncrono (bloqueante), por isso é chamado em uma thread no main.py
        response = sg.send(message)
        
        logger.info(f"E-mail de confirmação enviado para {recipient_email}, status: {response.status_code}")
        if response.status_code > 299:
             logger.error(f"Erro do SendGrid: {response.body}")

    except Exception as e:
        logger.error(f"Falha ao enviar e-mail via SendGrid para {recipient_email}: {e}")
        import traceback
        logger.error(traceback.format_exc())