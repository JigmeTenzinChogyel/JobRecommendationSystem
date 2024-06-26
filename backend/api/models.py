from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, user_role=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            user_role=user_role,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(
            email,
            password=password,
            name=name,
            user_role='admin',  # Set user_role to 'admin' by default
        )
        user.is_admin = True  # This line is no longer needed
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=30)
    user_role = models.CharField(max_length=20, choices=(('seeker', 'Seeker'), ('recruiter', 'Recruiter')))

    bio = models.CharField(max_length=200, null=True, blank=True)
    avatar = models.FileField(upload_to='avatar/', null=True, blank=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'user_role']

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
    resume_file = models.FileField(upload_to='resumes/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s Resume"

class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')
    name = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    description = models.TextField()
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    logo = models.FileField(upload_to='logo/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    description = models.TextField()
    summary = models.CharField(max_length=300)
    min_salary = models.DecimalField(max_digits=10, decimal_places=2)
    max_salary = models.DecimalField(max_digits=10, decimal_places=2)
    experience = ArrayField(models.TextField(), null=True, blank=True)
    skills = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    qualification = ArrayField(models.CharField(max_length=200), null=True, blank=True)
    deadline = models.DateField()
    job_file = models.FileField(upload_to='job/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_applications')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job_applications')
    application_status = models.CharField(max_length=20, choices=(('accepted', 'Accepted'), ('rejected', 'Rejected'), ('processing', 'Processing')), default="processing")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"applicant: {self.user} = {self.job.title}"
    
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_bookmarks')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='user_bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"Bookmark: {self.user.name} - {self.job.title}"

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='notification')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True, related_name='notification')
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=True, related_name='notification')
    message = models.CharField(max_length=200)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Notify: {self.user.name} - {self.job.title}"



