from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    username = models.CharField(max_length=150, unique=True, null=True, blank=True)

    email = models.EmailField(unique=True)
    boss = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='workers')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"username: {self.username}, email: {self.email}, is_staff: {self.is_staff}, is_active: {self.is_active}, last_login: {self.last_login}, date_joined: {self.date_joined}"