from django.db import models


# Company dimension table
class DimCompany(models.Model):

    company_id = models.CharField(
        max_length=50,
        primary_key=True
    )

    company_name = models.CharField(
        max_length=255
    )

    class Meta:
        db_table = 'dim_company'

    def __str__(self):

        return self.company_name


# Financial Analysis fact table
class FactAnalysis(models.Model):

    id = None

    company = models.ForeignKey(
        DimCompany,
        on_delete=models.CASCADE,
        db_column='company_id'
    )

    period = models.CharField(
        max_length=20,
        primary_key=True
    )

    sales_growth = models.FloatField(
        null=True
    )

    profit_growth = models.FloatField(
        null=True
    )

    stock_cagr = models.FloatField(
        null=True
    )

    roe_clean = models.FloatField(
        null=True
    )

    class Meta:
        db_table = 'fact_analysis'


# Cash Flow fact table
class FactCashFlow(models.Model):

    id = models.IntegerField(
        primary_key=True
    )

    company = models.ForeignKey(
        DimCompany,
        on_delete=models.CASCADE,
        db_column='company_id'
    )

    year = models.IntegerField()

    operating_activity = models.FloatField(
        null=True
    )

    investing_activity = models.FloatField(
        null=True
    )

    financing_activity = models.FloatField(
        null=True
    )

    net_cash_flow = models.FloatField(
        null=True
    )

    class Meta:
        db_table = 'fact_cash_flow'


# Balance Sheet fact table
class FactBalanceSheet(models.Model):

    id = models.AutoField(
        primary_key=True
    )

    company = models.ForeignKey(
        DimCompany,
        on_delete=models.CASCADE,
        db_column='company_id'
    )

    total_assets = models.FloatField(
        null=True
    )

    total_liabilities = models.FloatField(
        null=True
    )

    debt_to_equity = models.FloatField(
        null=True
    )

    class Meta:
        db_table = 'fact_balance_sheet'


# Profit & Loss fact table
class FactProfitLoss(models.Model):

    id = models.IntegerField(
        primary_key=True
    )

    company = models.ForeignKey(
        DimCompany,
        on_delete=models.CASCADE,
        db_column='company_id'
    )

    year = models.CharField(
        max_length=50
    )

    sales = models.FloatField(
        null=True
    )

    expenses = models.FloatField(
        null=True
    )

    operating_profit = models.FloatField(
        null=True
    )

    opm_percentage = models.FloatField(
        null=True
    )

    other_income = models.FloatField(
        null=True
    )

    interest = models.FloatField(
        null=True
    )

    depreciation = models.FloatField(
        null=True
    )

    profit_before_tax = models.FloatField(
        null=True
    )

    tax_percentage = models.FloatField(
        null=True
    )

    net_profit = models.FloatField(
        null=True
    )

    eps = models.FloatField(
        null=True
    )

    dividend_payout = models.FloatField(
        null=True
    )

    class Meta:
        db_table = 'fact_profit_loss'