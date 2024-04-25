from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, user_type=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            user_type=user_type,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(
            email,
            password=password,
            name=name,
            user_type='admin',  # Assuming 'admin' is a valid user_type value
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    user_type = models.CharField(max_length=20, choices=(('seeker', 'Seeker'), ('recruiter', 'Recruiter')))
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'user_type']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
class Resume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='resume')
    experience = ArrayField(models.TextField(), null=True, blank=True)
    skills = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    qualification = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    resume_file = models.FileField(upload_to='resumes/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s Resume"
    
class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    experience = ArrayField(models.TextField(), null=True, blank=True)
    skills = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    qualification = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    deadline = models.DateField()
    job_file = models.FileField(upload_to='job/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title