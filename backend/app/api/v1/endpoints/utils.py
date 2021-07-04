from fastapi import APIRouter, Depends, status
from pydantic.networks import EmailStr

from app.api import deps
from app.model.user import User
from app.schema.msg import Msg
from app.utils import send_test_sms

router = APIRouter()


@router.post("/test-email/", response_model=Msg, status_code=status.HTTP_201_CREATED)
def test_email(
    email_to: EmailStr,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Test emails.
    """
    send_test_email(email_to=email_to)
    return {"msg": "Test email sent"}


@router.post("/test-sms/", response_model=Msg, status_code=status.HTTP_201_CREATED)
def test_email(
    sms_to: str,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Test SMS.
    """
    send_test_sms(sms_to=sms_to)
    return {"msg": "Test SMS sent"}
