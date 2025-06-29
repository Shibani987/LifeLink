from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "user": serializer.data}, status=201)
    return Response({"success": False, "errors": serializer.errors}, status=400)



from django.contrib.auth.hashers import check_password
from rest_framework import status
from .models import User

from django.core.mail import send_mail
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from .serializers import UserSerializer  # ✅ import this

from .serializers import UserSerializer

from django.contrib.auth.hashers import check_password

from django.core.cache import cache
import random

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"success": False, "error": "Email and password are required."}, status=400)

    try:
        user = User.objects.get(email=email)

        if check_password(password, user.password):  # ✅ secure comparison
            if user.user_type == "donor":
                # 🔐 Generate 6-digit OTP
                otp = str(random.randint(100000, 999999))
                cache.set(f"otp_{user.id}", otp, timeout=300)  # ⏳ valid for 5 mins

                # ✉️ Send OTP email
                send_mail(
                    subject="🔐 Your LifeLink OTP Code",
                    message=f"Hello {user.name},\n\nYour OTP for login is: {otp}\nIt is valid for 5 minutes.\n\nThanks,\nTeam LifeLink",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[user.email],
                    fail_silently=False,
                )

                return Response({"success": "otp-sent", "user_id": user.id}, status=200)

            # 🏥 Recipient & Hospital: normal login with welcome email
            serializer = UserSerializer(user)
            send_mail(
                subject="Welcome Back to LifeLink! ❤️",
                message=f"Hello {user.name},\n\nWe're glad to see you  on LifeLink. Thank you for being part of the mission to save lives.\n\nStay connected,\n\nTeam LifeLink",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False,
            )
            return Response({"success": True, "user": serializer.data}, status=200)

        else:
            return Response({"success": False, "error": "Invalid password."}, status=401)

    except User.DoesNotExist:
        return Response({"success": False, "error": "User not found."}, status=404)

@api_view(['POST'])
def verify_otp(request):
    user_id = request.data.get('user_id')
    otp = request.data.get('otp')

    if not user_id or not otp:
        return Response({"success": False, "error": "Missing OTP or user ID."}, status=400)

    saved_otp = cache.get(f"otp_{user_id}")
    if saved_otp == otp:
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response({"success": True, "user": serializer.data}, status=200)
        except User.DoesNotExist:
            return Response({"success": False, "error": "User not found."}, status=404)
    else:
        return Response({"success": False, "error": "Invalid or expired OTP."}, status=400)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, EmergencyRequest
from .serializers import UserSerializer, EmergencyRequestSerializer


# ✅ 1. Get all active emergency requests
@api_view(['GET'])
def emergency_requests(request):
    requests = EmergencyRequest.objects.filter(status="active")
    serializer = EmergencyRequestSerializer(requests, many=True)
    return Response({"requests": serializer.data})

# ✅ 2. Get matching donors for a recipient
@api_view(['GET'])
def matching_donors(request, recipient_id):
    try:
        recipient = User.objects.get(id=recipient_id, user_type='recipient')
        recipient_organs = recipient.organs or []
        donors = User.objects.filter(user_type='donor', blood_group=recipient.blood_group)

        matching = []
        for donor in donors:
            if donor.organs:
                if any(organ in recipient_organs for organ in donor.organs):
                    matching.append(donor)

        serializer = UserSerializer(matching, many=True)
        return Response({"matches": serializer.data})

    except User.DoesNotExist:
        return Response({"error": "Recipient not found"}, status=404)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
@api_view(['GET'])
def matching_recipients(request, donor_id):
    try:
        donor = User.objects.get(id=donor_id)
        recipients = User.objects.filter(user_type='recipient')

        # Optional: Match logic (e.g., same blood group or organ needed)
        matches = recipients.filter(blood_group=donor.blood_group)

        serializer = UserSerializer(matches, many=True)
        return Response({"matches": serializer.data})
    except User.DoesNotExist:
        return Response({"error": "Donor not found"}, status=404)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User  # Replace with your actual model name if different
from .serializers import UserSerializer  # Ensure this serializer exists

@api_view(["GET"])
def get_users(request):
    user_type = request.GET.get("user_type")
    if user_type:
        users = User.objects.filter(user_type=user_type)

    else:
        users = User.objects.all()

    serializer = UserSerializer(users, many=True)
    return Response({"users": serializer.data})




@api_view(['GET', 'POST'])
def emergency_requests(request):

    if request.method == 'GET':
        requests = EmergencyRequest.objects.filter(status="active")
        serializer = EmergencyRequestSerializer(requests, many=True)
        return Response({"requests": serializer.data})

    # --- handle POST ---
    serializer = EmergencyRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(status="active")          # or keep request.data['status']
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


# views.py
from rest_framework import generics, permissions
from .models import EmergencyRequest, User
from .serializers import EmergencyRequestSerializer, UserSerializer
from django.core.mail import send_mail
from django.conf import settings

class EmergencyRequestListCreateAPIView(generics.ListCreateAPIView):
    """
    GET  → list *active* requests   (for hospitals)
    POST → create a new request     (for recipients)
    """
    serializer_class = EmergencyRequestSerializer
    permission_classes = [permissions.AllowAny]          # adjust as needed

    def get_queryset(self):
        # Hospitals only need open cases, newest first
        return EmergencyRequest.objects.filter(
            status__in=["active", "pending"]
        ).order_by("-timestamp")

    def perform_create(self, serializer):
        """
        Called after serializer.is_valid() on POST.
        1. Save as 'active'
        2. Notify matching donors
        3. Notify hospitals
        """
        request_obj = serializer.save(status="active")

        # --- 1️⃣  Notify matching donors -----------------------------
        donors = User.objects.filter(
            user_type="donor",
            blood_group=request_obj.blood_group,
        )
        donors = [
            d for d in donors
            if request_obj.organ.lower() in [o.lower() for o in (d.organs or [])]
        ]
        donor_emails = [d.email for d in donors]

        if donor_emails:
            send_mail(
                subject=f"🚨 Urgent {request_obj.organ} request in your area",
                message=(
                    f"Dear donor,\n\n"
                    f"A patient ({request_obj.patient_name}) needs a "
                    f"{request_obj.organ}. If you can help, please log in to "
                    f"LifeLink or contact the hospital at {request_obj.hospital_name}.\n\n"
                    f"Thank you!"
                ),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=donor_emails,
                fail_silently=True,
            )

        # --- 2️⃣  Notify hospitals -----------------------------------
        hospital_emails = list(
            User.objects.filter(user_type="hospital").values_list("email", flat=True)
        )
        send_mail(
            subject="📢 New emergency organ request posted",
            message=(
                f"Patient: {request_obj.patient_name}\n"
                f"Organ: {request_obj.organ}\n"
                f"Blood group: {request_obj.blood_group}\n"
                f"Urgency: {request_obj.urgency_level}\n\n"
                f"Please review in the LifeLink dashboard."
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=hospital_emails,
            fail_silently=True,
        )

# views.py

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

        # ✅ These methods must exist in your models
        donor.mark_matched()
        recipient.mark_matched()
        emergency_request.mark_matched()

        return Response({"success": True, "message": "Match confirmed successfully"}, status=200)

    except User.DoesNotExist:
        return Response({"success": False, "error": "Donor or Recipient not found"}, status=404)
    except EmergencyRequest.DoesNotExist:
        return Response({"success": False, "error": "Emergency request not found"}, status=404)
from rest_framework import viewsets
from .models import EmergencyRequest
from .serializers import EmergencyRequestSerializer

