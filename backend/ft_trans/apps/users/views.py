from .imports import *

# 1. CSRF INITIALIZER — Frontend calls this ONCE on page load
@ensure_csrf_cookie
@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def get_csrf(request):
    return JsonResponse({"message": "CSRF cookie set."})


# 2. REGISTER VIEW
@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def register(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password or not first_name or not last_name:
        return JsonResponse({"error": "All fields are required."}, status=400)

    try:
        user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name, last_name=last_name, is_staff=True)
    except IntegrityError:
        return JsonResponse({"error": "Email already registered."}, status=409)

    return JsonResponse({"message": "User registered successfully.", "user_id": user.id}, status=201)


# 3. LOGIN VIEW
@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return JsonResponse({"error": "All fields are required."}, status=400)

    user = authenticate(request, username=email, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid email or password."}, status=401)

    login(request, user)

    return JsonResponse({
        "message": "Logged in successfully.",
        "user": {
            "id": user.id,
            "email": user.email,
        }
    })


# 4. LOGOUT VIEW
@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully."})

# 5. create employees
# @api_view(['POST'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def create_emp(request):
#     first_name = request.data.get('first_name')
#     last_name = request.data.get('last_name')
#     email = request.data.get('email')
#     password = request.data.get('password')
    
#     if not email or not password or not first_name or not last_name:
#         return JsonResponse({"error": "All fields are required."}, status=400)

#     try:
#         emp = User.objects.create_user(username=email, email=email, password=password, last_name=last_name, first_name=first_name, boss=request.user)
#     except IntegrityError:
#             return JsonResponse({"error": "Email already registered."}, status=409)

#     return JsonResponse({"message": "User registered successfully.", "user_id": emp.id}, status=201)

# # 6. get employees
# @api_view(['GET'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def employees(request):
#     workers = request.user.workers.all()
#     data = [
#         {
#             "id": worker.id,
#             "first_name": worker.first_name,
#             "boss": worker.boss.first_name,
#         }
#         for worker in workers
#     ]
#     return JsonResponse({"workers": data})

# test view
class EmployeesView(APIView):
    
    authentication_classes = [SessionAuthentication]

    def get_permissions(self):
        if self.request.method in ['POST', 'GET']:
            return [IsAuthenticated(), IsAdminUser()]

        return [IsAuthenticated()]

    def get(self, request):
        workers = request.user.workers.all()
        data = [
            {
                "id": worker.id,
                "first_name": worker.first_name,
                "boss": worker.boss.first_name,
            }
            for worker in workers
        ]
        return JsonResponse({"workers": data})

    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password or not first_name or not last_name:
            return JsonResponse({"error": "All fields are required."}, status=400)
    
        try:
            emp = User.objects.create_user(username=email, email=email, password=password, last_name=last_name, first_name=first_name, boss=request.user)
        except IntegrityError:
                return JsonResponse({"error": "Email already registered."}, status=409)
    
        return JsonResponse({"message": "User registered successfully.", "user_id": emp.id}, status=201)