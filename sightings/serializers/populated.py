from .common import SightingSerializer
from comments.serializers.common import CommentSerializer
from animals.serializers.common import AnimalSerializer

class PopulatedSightingSerializer(SightingSerializer):
    animal = AnimalSerializer()
    comments = CommentSerializer(many=True)