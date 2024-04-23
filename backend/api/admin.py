from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Resume
from django.contrib.postgres import fields as postgres_fields

class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'name', 'user_type', 'is_active', 'is_admin', 'created_at', 'updated_at')
    list_filter = ('is_active', 'is_admin', 'user_type')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'user_type')}),
        ('Permissions', {'fields': ('is_admin',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'user_type', 'password1', 'password2'),
        }),
    )

    search_fields = ('email', 'name')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    formfield_overrides = {
        postgres_fields.ArrayField: {'widget': admin.widgets.FilteredSelectMultiple(
            verbose_name='Items',
            is_stacked=False
        )},
    }

admin.site.register(Resume, ResumeAdmin)