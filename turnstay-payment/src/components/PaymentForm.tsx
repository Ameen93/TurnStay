import React, { useState } from "react";
import axios from "axios";
import { PaymentDetails } from "../types/PaymentDetails";

const PaymentForm: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: 0,
    currency: "USD",
    customerEmail: "",
    customerPhoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendPaymentDetails: PaymentDetails = {
      accountId: 1,
      billingAmount: paymentDetails.amount * 100, // Convert to cents
      billingCurrency: paymentDetails.currency,
      processingCurrency: "USD",
      checkinDate: "2023-08-07", // Dummy data
      checkoutDate: "2023-08-10", // Dummy data
      description: "Payment for services",
      product: "Service",
      customer: "John Doe",
      customerEmail: paymentDetails.customerEmail,
      customerPhoneNumber: paymentDetails.customerPhoneNumber,
      callbackUrl: "https://www.example.com/callback",
      successRedirectUrl: "https://www.example.com/success",
      failedRedirectUrl: "https://www.example.com/failed",
      paymentUrlStyle: "embed",
      paymentType: "Card Payment",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/payments/intent",
        backendPaymentDetails
      );
      alert("Payment Intent Created Successfully!");
      window.location.href = response.data.turnstay_payment_url;
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      alert("Failed to create payment intent. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Payment Form</h1>
      <label>
        Card Number:
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Expiry Date (MM/YY):
        <input
          type="text"
          name="expiryDate"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        CVV:
        <input
          type="text"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={paymentDetails.amount}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Currency:
        <select
          name="currency"
          value={paymentDetails.currency}
          onChange={handleChange}
          required
        >
          <option value="USD">USD</option>
          <option value="ZAR">ZAR</option>
          <option value="EUR">EUR</option>
        </select>
      </label>
      <label>
        Customer Email:
        <input
          type="email"
          name="customerEmail"
          value={paymentDetails.customerEmail}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Customer Phone Number:
        <input
          type="tel"
          name="customerPhoneNumber"
          value={paymentDetails.customerPhoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
