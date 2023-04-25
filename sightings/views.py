from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Sighting
from .serializers.common import SightingSerializer
from .serializers.populated import PopulatedSightingSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

from lib.exceptions import exceptions

class SightingListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    @exceptions
    def get(self, request):
        sightings = Sighting.objects.all()
        serialzed_sightings= PopulatedSightingSerializer(sightings, many=True)
        return Response(serialzed_sightings.data)

    @exceptions
    def post(self, request):
          print('reuqest data:', { **request.data, 'owner': request.user.id })
          sighting_to_create = SightingSerializer(data={ **request.data, 'owner': request.user.id })
          sighting_to_create.is_valid(raise_exception=True)
          sighting_to_create.save()
          return Response(sighting_to_create.data, status.HTTP_201_CREATED)

class SightingDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    @exceptions
    def get(self, request, pk):
      sighting = Sighting.objects.get(pk=pk)
      serialized_sighting = PopulatedSightingSerializer(sighting)
      return Response(serialized_sighting.data)

    @exceptions
    def delete(self, request, pk):
      sighting_to_delete = Sighting.objects.get(pk=pk)
      print('sighting owner', sighting_to_delete.owner)
      print('user delete', request.user)
      print('match', request.user == sighting_to_delete.owner)
      if sighting_to_delete.owner != request.user and not request.user.is_staff:
          raise PermissionDenied()
      sighting_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)