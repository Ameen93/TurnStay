export interface PaymentDetails {
    accountId: number;
    billingAmount: number;
    billingCurrency: string;
    processingCurrency: string;
    checkinDate: string;
    checkoutDate: string;
    description: string;
    product: string;
    customer: string;
    customerEmail: string;
    customerPhoneNumber: string;
    callbackUrl: string;
    successRedirectUrl: string;
    failedRedirectUrl: string;
    paymentUrlStyle: string;
    paymentType: string;
}
