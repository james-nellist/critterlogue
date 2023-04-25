from rest_framework.serializers import ModelSerializer
from ..models import Sighting

class SightingSerializer(ModelSerializer):
    class Meta:
        model = Sighting
        fields = '__all__'