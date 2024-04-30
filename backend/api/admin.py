from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Resume, Job, Company, Application, Notification

class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'name', 'user_role', 'is_active', 'is_admin', 'created_at', 'updated_at')
    list_filter = ('is_active', 'is_admin', 'user_role')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'user_role')}),
        ('Permissions', {'fields': ('is_admin',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'user_role', 'password1', 'password2'),
        }),
    )

    search_fields = ('email', 'name')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Resume, ResumeAdmin)

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'description', 'city', 'country')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Company, CompanyAdmin)

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'min_salary', 'max_salary', 'deadline')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Job, JobAdmin)

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'application_status')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Application, ApplicationAdmin)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'message', 'is_read')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Notification, NotificationAdmin)