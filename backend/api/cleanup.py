# yourapp/cleanup.py

from datetime import timedelta
from django.utils import timezone
from .models import User, EmergencyRequest

def delete_old_matched_data(days=30):
    """
    Deletes Users and EmergencyRequests with matched_at older than `days`.
    """
    cutoff = timezone.now() - timedelta(days=days)

    # Find and delete old matched users
    old_users = User.objects.filter(matched_at__lt=cutoff)
    users_deleted = old_users.count()
    old_users.delete()

    # Find and delete old matched emergency requests
    old_requests = EmergencyRequest.objects.filter(matched_at__lt=cutoff)
    requests_deleted = old_requests.count()
    old_requests.delete()

    return users_deleted, requests_deleted
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, EmergencyRequest

@api_view(['POST'])
def confirm_match(request):
    donor_id = request.data.get('donor_id')
    recipient_id = request.data.get('recipient_id')
    request_id = request.data.get('request_id')

    if not (donor_id and recipient_id and request_id):
        return Response({"success": False, "error": "Missing required fields"}, status=400)

    try:
        donor = User.objects.get(id=donor_id, user_type='donor')
        recipient = User.objects.get(id=recipient_id, user_type='recipient')
        emergency_request = EmergencyRequest.objects.get(id=request_id)

        # ✅ Mark as matched
        donor.mark_matched()
        recipient.mark_matched()
        emergency_request.mark_matched()

        return Response({"success": True, "message": "Match confirmed and marked"}, status=200)

    except User.DoesNotExist:
        return Response({"success": False, "error": "Donor or Recipient not found"}, status=404)
    except EmergencyRequest.DoesNotExist:
        return Response({"success": False, "error": "Emergency request not found"}, status=404)
