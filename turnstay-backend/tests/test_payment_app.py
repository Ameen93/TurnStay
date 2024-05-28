# test_payment_app.py
import unittest
import requests_mock
from payment_app import create_payment_intent


class TestPaymentApp(unittest.TestCase):
    def setUp(self):
        self.payment_details = {
            "account_id": 1,
            "billing_amount": 2200,
            "billing_currency": "ZAR",
            "processing_currency": "USD",
            "checkin_date": "2024-05-27",
            "checkout_date": "2024-05-31",
            "description": "A spacious room with a king-size bed and a private balcony.",
            "product": "King Room",
            "customer": "Ameen Solomon",
            "customer_email": "ameen.solomon@gmail.com",
            "customer_phone_number": "0711257923",
            "callback_url": "https://www.guesthouse.com",
            "success_redirect_url": "https://turnstay.com/",
            "failed_redirect_url": "https://www.google.com/",
            "payment_url_style": "embed",
            "payment_type": "Card Payment",
        }

    @requests_mock.Mocker()
    def test_create_payment_intent_success(self, mock_request):
        mock_url = "https://staging.turnstay.com/api/v1/payments/intent"
        mock_response = {"status": "success", "payment_intent_id": "pi_123456789"}
        mock_request.post(mock_url, json=mock_response, status_code=200)

        # Call the function to test
        result = create_payment_intent(self.payment_details)

        self.assertIsNotNone(result)
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["payment_intent_id"], "pi_123456789")

    @requests_mock.Mocker()
    def test_create_payment_intent_failure(self, mock_request):
        mock_url = "https://staging.turnstay.com/api/v1/payments/intent"
        mock_request.post(mock_url, json={"error": "Invalid request"}, status_code=422)

        # Call the function to test
        result = create_payment_intent(self.payment_details)

        self.assertIsNone(result)


if __name__ == "__main__":
    unittest.main()
