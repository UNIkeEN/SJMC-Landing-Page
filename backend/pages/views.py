from django.http import JsonResponse
from .models import Page
from asgiref.sync import sync_to_async

@sync_to_async
def get_page(request, page_id):
    page = Page.objects.get(pk=page_id)
    return JsonResponse({
        'title': page.title,
        'subtitle': page.subtitle,
        'type': page.type,
        'content': page.content,
        'is_shown': page.is_shown
    })

@sync_to_async
def list_pages(request):
    pages = Page.objects.filter(is_shown=True).order_by('id').values(
        'id', 'title', 'subtitle', 'card_color_light', 'card_color_dark'
        )
    return JsonResponse(list(pages), safe=False)