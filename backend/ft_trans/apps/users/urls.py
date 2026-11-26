from django.urls import path, include
from . import views

urlpatterns = [
    path('csrf', views.get_csrf, name='get_csrf'),
    path('register', views.register, name='register'),
    path('login', views.login_view, name='login_view'),
    path('logout', views.logout_view, name='logout_view'),
    path('employees/', views.EmployeesView.as_view(), name='EmployeesView'),
]