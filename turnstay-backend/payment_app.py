import requests
import json

with open("turnstay-backend\config.json") as config_file:
    config = json.load(config_file)


def get_dummy_payment_details():
    return {
        "account_id": 1,
        "billing_amount": 450000,
        "billing_currency": "ZAR",
        "processing_currency": "USD",
        "checkin_date": "2023-08-07",
        "checkout_date": "2023-08-10",
        "description": "",
        "product": "",
        "customer": "",
        "customer_email": "josh@turnstay.com",
        "customer_phone_number": "",
        "callback_url": "https://www.guesthouse.com",
        "success_redirect_url": "https://turnstay.com/",
        "failed_redirect_url": "https://www.google.com/",
        "payment_url_style": "embed",
        "payment_type": "Card Payment",
    }


def create_payment_intent(payment_details):
    url = f"{config['base_url']}/payments/intent"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {config['api_key']}",
    }
    payload = {
        "account_id": payment_details["account_id"],
        "billing_amount": payment_details["billing_amount"],
        "billing_currency": payment_details["billing_currency"],
        "processing_currency": payment_details["processing_currency"],
        "checkin_date": payment_details["checkin_date"],
        "checkout_date": payment_details["checkout_date"],
        "description": payment_details["description"],
        "product": payment_details["product"],
        "customer": payment_details["customer"],
        "customer_email": payment_details["customer_email"],
        "customer_phone_number": payment_details["customer_phone_number"],
        "callback_url": payment_details["callback_url"],
        "success_redirect_url": payment_details["success_redirect_url"],
        "failed_redirect_url": payment_details["failed_redirect_url"],
        "payment_url_style": payment_details["payment_url_style"],
        "payment_type": payment_details["payment_type"],
    }

    try:
        print(f"Sending payload: {json.dumps(payload, indent=2)}")
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        payment_response = response.json()
        print(f"Response: {json.dumps(payment_response, indent=2)}")
        return payment_response
    except requests.exceptions.RequestException as e:
        print(f"Payment initialization failed: {e}")
        if e.response:
            print(f"Response content: {e.response.content}")
            try:
                error_details = e.response.json()
                print(f"Validation errors: {json.dumps(error_details, indent=2)}")
            except json.JSONDecodeError:
                print("Failed to decode JSON response content.")
        return None


if __name__ == "__main__":
    payment_details = get_dummy_payment_details()
    create_payment_intent(payment_details)
