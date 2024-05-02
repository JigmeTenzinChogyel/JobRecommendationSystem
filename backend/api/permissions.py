from rest_framework import permissions

class IsSeeker(permissions.BasePermission):
    """
    Allows access only to users with the 'seeker' role.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.user_role == 'seeker')

class IsRecruiter(permissions.BasePermission):
    """
    Allows access only to users with the 'recruiter' role.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.user_role == 'recruiter')