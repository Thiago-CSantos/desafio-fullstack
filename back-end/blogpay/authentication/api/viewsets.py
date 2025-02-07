from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from authentication.api import serializers
from authentication import models

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        user = self.user
        data['user_id'] = user.id 
        data['email'] = user.email 
        data['name'] = user.name
        return data
    
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_id'] = str(user.id)
        token['email'] = user.email
        token['name'] = user.name 
        token['is_admin'] = user.is_admin
        
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            
            if not refresh_token:
                return Response({"error": "Refresh token é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            
            if BlacklistedToken.objects.filter(token__jti=token["jti"]).exists():
                return Response({"error": "Token já foi invalidado."}, status=status.HTTP_400_BAD_REQUEST)

            token.blacklist()

            return Response({"message": "Logout realizado com sucesso!"}, status=status.HTTP_200_OK)
        except TokenError:
            return Response({"error": "Token inválido ou já expirado."}, status=status.HTTP_400_BAD_REQUEST)