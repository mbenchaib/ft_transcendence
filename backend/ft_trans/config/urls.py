from django.contrib import admin
from django.urls import path, include
from .health import health

urlpatterns = [
    path('api/health/', health),
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/clients/', include('apps.clients.urls')),

]