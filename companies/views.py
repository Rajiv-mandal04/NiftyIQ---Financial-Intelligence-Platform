from django.http import JsonResponse
from .models import DimCompany
from .models import FactAnalysis
from .models import FactCashFlow
from .models import FactBalanceSheet
from .models import FactProfitLoss
from django.db.models import Q

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CompanySerializer


@api_view(['GET'])
def company_list(request):

    companies = DimCompany.objects.all()

    serializer = CompanySerializer(
        companies,
        many=True
    )

    return Response(serializer.data)


def home(request):

    return JsonResponse({
        "message": "Nifty100 Financial Intelligence API Running"
    })


def company_detail(request, company_id):

    data = list(
        FactAnalysis.objects.filter(
            company__company_id=company_id
        ).values()
    )

    return JsonResponse(data, safe=False)


def top_growth_companies(request):

    data = list(
        FactAnalysis.objects.values(
            'company__company_name',
            'sales_growth',
            'profit_growth',
            'stock_cagr'
        ).order_by('-sales_growth')[:20]
    )

    return JsonResponse(data, safe=False)


def cashflow_data(request):

    data = list(
        FactCashFlow.objects.values(
            'company__company_name',
            'year',
            'operating_activity',
            'net_cash_flow'
        )[:50]
    )

    return JsonResponse(data, safe=False)


def balance_sheet_data(request):

    data = list(
        FactBalanceSheet.objects.values(
            'company__company_name',
            'total_assets',
            'total_liabilities',
            'debt_to_equity'
        )[:50]
    )

    return JsonResponse(data, safe=False)


# Search companies by keyword
def search_company(request, keyword):

    data = list(
        DimCompany.objects.filter(
            Q(company_name__icontains=keyword) |
            Q(company_id__icontains=keyword)
        ).values()
    )

    return JsonResponse(data, safe=False)


# Company Dashboard API
def company_dashboard(request, company_id):

    # Analysis data
    analysis = list(
        FactAnalysis.objects.filter(
            company__company_id=company_id
        ).values()
    )

    # Permanent fallback using Profit & Loss table
    if not analysis:

        latest_record = FactProfitLoss.objects.filter(
            company__company_id=company_id
        ).order_by('-year').first()

        previous_record = FactProfitLoss.objects.filter(
            company__company_id=company_id
        ).order_by('-year')[1:2]

        previous_record = previous_record[0] if previous_record else None

        sales_growth = 0
        profit_growth = 0
        stock_cagr = 0

        if latest_record and previous_record:

            # Sales Growth
            if previous_record.sales and previous_record.sales != 0:

                sales_growth = round(
                    (
                        (
                            latest_record.sales -
                            previous_record.sales
                        ) / previous_record.sales
                    ) * 100,
                    2
                )

            # Profit Growth
            if previous_record.net_profit and previous_record.net_profit != 0:

                profit_growth = round(
                    (
                        (
                            latest_record.net_profit -
                            previous_record.net_profit
                        ) / previous_record.net_profit
                    ) * 100,
                    2
                )

            # Temporary Stock CAGR
            stock_cagr = profit_growth

        analysis = [{
            "sales_growth": sales_growth,
            "profit_growth": profit_growth,
            "stock_cagr": stock_cagr
        }]

    # Cashflow data
    cashflow = list(
        FactCashFlow.objects.filter(
            company__company_id=company_id
        ).values()
    )

    # Balance Sheet data
    balance_sheet = list(
        FactBalanceSheet.objects.filter(
            company__company_id=company_id
        ).values()
    )

    # Profit & Loss data
    profit_loss = list(
        FactProfitLoss.objects.filter(
            company__company_id=company_id
        ).values()
    )

    data = {
        "analysis": analysis,
        "cashflow": cashflow,
        "balance_sheet": balance_sheet,
        "profit_loss": profit_loss
    }

    return JsonResponse(data)