from django.urls import path
from . import views
from .views import company_list, company_detail

urlpatterns = [
    path('', views.home),
    path('companies/', company_list),
    path('company/<str:company_id>/', company_detail),
    path('top-growth/', views.top_growth_companies),
    path('cashflow/',views.cashflow_data),
    path('balance-sheet/',views.balance_sheet_data),
    path('search/<str:keyword>/',views.search_company),
    path('dashboard/<str:company_id>/',views.company_dashboard),
]