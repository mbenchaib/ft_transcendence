from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import IntegrityError
from .models import User

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# Django REST Framework
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView

# Python
import os
import json

