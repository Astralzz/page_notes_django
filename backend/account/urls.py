from django.urls import path
from django.urls import path
from .views import RegisterView, UserListView, UserDetailView, CurrentUserViewToken

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # GET | PUT | DELETE
    path('me/', CurrentUserViewToken.as_view(), name='current-user'),
]
