from .common import AnimalSerializer
from sightings.serializers.common import SightingSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    sightings = SightingSerializer(many=True)