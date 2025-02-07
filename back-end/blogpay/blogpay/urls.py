from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from authentication.api import viewsets as auth_viewsets
from authentication.api.viewsets import LogoutView
from authentication.api.viewsets import CustomTokenObtainPairView
from publication.api.viewsets import PublicationViewSet

router = routers.DefaultRouter()
router.register(r'users', auth_viewsets.UserViewSet, basename='User')
router.register(r'publication', PublicationViewSet, basename='Publication')

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path("", include(router.urls)),
    path('publication/<uuid:pk>/update_publish/', PublicationViewSet.as_view({'patch': 'update_publish'}), name='update_publish'),
]
