# backend/email_service.py (Atualizado com Template Futurista)

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
    html_content = f"""
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirme sua Conta</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f1112; font-family: Arial, sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0f1112;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #141416; border-radius: 8px; border: 1px solid #222425; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
                    
                    <!-- 1. Seção da Logo -->
                    <tr>
                        <td align="center" style="padding: 30px 20px 20px 20px;">
                            <!-- ✅ SUA LOGO (deve estar em frontend/public/Logo_AI.png) -->
                            <img src="{frontend_url}/Logo_AI.png" alt="AI Academy Logo" style="height: 50px; width: auto; display: block;">
                        </td>
                    </tr>
                    
                    <!-- 2. Seção do Título -->
                    <tr>
                        <td align="center" style="padding: 0 30px 20px 30px;">
                            <h1 style="margin: 0; color: #eef0f2; font-size: 24px; font-weight: 700;">
                                Confirme sua conta
                            </h1>
                        </td>
                    </tr>

                    <!-- 3. Seção do Corpo -->
                    <tr>
                        <td align="left" style="padding: 0 40px 30px 40px; color: #a9adb2; font-size: 16px; line-height: 1.6;">
                            <p style="margin: 0 0 20px 0;">Olá, <strong>{username}</strong>!</p>
                            <p style="margin: 0 0 25px 0;">
                                Obrigado por se registrar no AI Academy. Para ativar sua conta e começar a usar seu assistente de pesquisa, por favor, clique no botão abaixo:
                            </p>
                        </td>
                    </tr>

                    <!-- 4. Seção do Botão (CTA) -->
                    <tr>
                        <td align="center" style="padding: 0 40px 40px 40px;">
                            <!-- Tabela interna para o botão (para compatibilidade) -->
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background: linear-gradient(90deg, #00e0c6, #ad53ff); border-radius: 8px;">
                                        <a href="{confirmation_link}"
                                           target="_blank"
                                           style="padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; display: inline-block;">
                                            Ativar Minha Conta
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 5. Seção do Rodapé -->
                    <tr>
                        <td align="center" style="padding: 20px 40px 30px 40px; border-top: 1px solid #222425; color: #a9adb2; font-size: 12px;">
                            <p style="margin: 0;">Se você não se registrou no AI Academy, por favor, ignore este e-mail.</p>
                            <p style="margin: 10px 0 0 0;">© 2025 AI Academy. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    """
    
    # Cria o objeto de e-mail do SendGrid
    message = Mail(
        from_email=(f"AI Academy <{FROM_EMAIL}>", FROM_EMAIL), # Nome "De" profissional
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