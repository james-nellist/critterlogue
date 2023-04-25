from django.contrib import admin
from django.urls import path, include
from .views import AnimalListView, AnimalSingleView

urlpatterns = [
    path('', AnimalListView.as_view()),
    path('<int:pk>/', AnimalSingleView.as_view()),
]