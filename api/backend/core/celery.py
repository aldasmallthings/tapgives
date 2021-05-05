from celery import Celery

from .config import settings

celery_app = Celery("worker", broker=settings.REDIS_URL)

celery_app.conf.task_routes = {"app.worker.test_celery": "main-queue"}
