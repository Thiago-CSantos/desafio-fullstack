from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from publication.models import Publication
from publication.api.serializers import PublicationSerializer

class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['title', 'content']
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        print('Publication updated')
        return response
    
    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def update_publish(self, request, *args, pk=None):
        publication = self.get_object()
        publication.is_published = not publication.is_published
        publication.save()
        serializer = PublicationSerializer(publication)
        return Response(serializer.data)