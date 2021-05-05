from pydantic import BaseModel


class Mail(BaseModel):
    to: str
    re: str
    msg: str

