from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from .serializers.common import AnimalSerializer
from .serializers.populated import PopulatedAnimalSerializer
from .models import Animal
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from lib.exceptions import exceptions


class AnimalListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def get(self, request):
        animals = Animal.objects.all()
        serialized_animals = PopulatedAnimalSerializer(animals, many=True)
        return Response(serialized_animals.data)
    
    @exceptions
    def post(self, request):
        # try:
            animal = AnimalSerializer(data=request.data)
            animal.is_valid(raise_exception=True)
            animal.save()
            print(animal.data)
            return Response (animal.data, status.HTTP_201_CREATED)
        # except ValidationError as e:
        #     print(e.__dict__)
        #     return Response (e.__dict__, status.HTTP_422_UNPROCESSABLE_ENTITY)
        # except Exception as e:
        #     print(e)
        #     return Response(e.__dict__ if e.__dict__ else str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class AnimalSingleView(APIView):
    # def get_animal(self, pk):
    #     try:
    #         return Animal.objects.get(pk=pk)
    #     except Animal.DoesNotExist:
    #         raise NotFound({ 'message': 'not found it' })
    @exceptions
    def get(self, request, pk):
        animal = Animal.objects.get(pk=pk)
        serialised_animal = PopulatedAnimalSerializer(animal)
        return Response(serialised_animal.data)
    
    @exceptions
    def put(self, request, pk):
        animal = Animal.objects.get(pk=pk)
        serialized_animal = AnimalSerializer(animal, request.data, partial=True)
        # try:
        serialized_animal.is_valid(raise_exception=True)
        serialized_animal.save()
        return Response(serialized_animal.data)
        # except ValidationError as e:
        #     return Response(e.__dict__, status.HTTP_422_UNPROCESSABLE_ENTITY)
        # except Exception as e:
        #   print(e)
        # return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) })
    
    @exceptions
    def delete(self, request, pk):
        animal = Animal.objects.get(pk=pk)
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)