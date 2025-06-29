from django.urls import path
from .views import (
    register_user, login_user, verify_otp,
    get_users,                         # ← import
    emergency_requests, matching_donors,
    matching_recipients, confirm_match
)

urlpatterns = [
    path("register/",  register_user),
    path("login/",     login_user),
    path("verify-otp/", verify_otp),
    path("users/",     get_users),     # ← EXACT route
    path("emergency-requests/", emergency_requests),
    path("matching-donors/<int:recipient_id>/", matching_donors),
    path("matching-recipients/<int:donor_id>/", matching_recipients),
    path("confirm-match/", confirm_match),
]
