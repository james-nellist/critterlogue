from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from rest_framework.response import Response

from .models import Comment
from .serializers.common import CommentSerializer

from lib.exceptions import exceptions

class CommentListView(APIView):
    
    @exceptions
    def get(self, request):
        comments = Comment.objects.all()
        serialzed_comments= CommentSerializer(comments, many=True)
        return Response(serialzed_comments.data)

    @exceptions
    def post(self, request):
          comment_to_create = CommentSerializer(data=request.data)
          comment_to_create.is_valid(raise_exception=True)
          comment_to_create.save()
          return Response(comment_to_create.data, status.HTTP_201_CREATED)

class CommentDetailView(APIView):
    @exceptions
    def delete(self, request, pk):
      comment_to_delete = Comment.objects.get(pk=pk)
      comment_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)