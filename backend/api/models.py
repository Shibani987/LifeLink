from django.db import models

# Create your models here.
from django.db import models

from django.utils import timezone

class User(models.Model):
    USER_TYPES = (
        ("hospital", "Hospital"),
        ("donor", "Donor"),
        ("recipient", "Recipient"),
    )

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    age = models.PositiveIntegerField(null=True, blank=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)

    organs = models.JSONField(blank=True, null=True)
    hospital_name = models.CharField(max_length=200, blank=True)
    license_number = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    matched_at = models.DateTimeField(null=True, blank=True)
    def mark_matched(self):
        self.matched_at = timezone.now()
        self.save(update_fields=["matched_at"])
    def __str__(self):
        return self.email


# models.py
from django.db import models

class EmergencyRequest(models.Model):
    patient_name = models.CharField(max_length=100)
    age = models.IntegerField()
    blood_group = models.CharField(max_length=5)
    organ = models.CharField(max_length=50)
    urgency_level = models.CharField(max_length=50)
    hospital_name = models.CharField(max_length=200)
    doctor_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=20)
    medical_history = models.TextField(blank=True)
    additional_notes = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="pending")
    matched_at    = models.DateTimeField(null=True, blank=True)   # NEW

    def mark_matched(self):
        """Call this when donor & recipient are confirmed."""
        self.status = "matched"
        self.matched_at = timezone.now()
        self.save(update_fields=["status", "matched_at"])
    def __str__(self):
        return f"{self.patient_name} - {self.organ}"
