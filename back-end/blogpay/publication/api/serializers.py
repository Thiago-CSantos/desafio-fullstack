from publication.models import Publication
from rest_framework import serializers

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'
        
    def create(self, validated_data):
        return Publication.objects.create(**validated_data)