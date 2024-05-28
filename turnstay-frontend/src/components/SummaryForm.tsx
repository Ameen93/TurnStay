import React, { useEffect, useState } from "react";
import axios from "axios";

interface SummaryFormProps {
  selectedRoom: any;
  customerDetails: any;
  dates: { checkInDate: Date | null; checkOutDate: Date | null };
}

const SummaryForm: React.FC<SummaryFormProps> = ({
  selectedRoom,
  customerDetails,
  dates,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (
      dates.checkInDate &&
      dates.checkOutDate &&
      selectedRoom.billing_amount
    ) {
      const timeDiff = Math.abs(
        dates.checkOutDate.getTime() - dates.checkInDate.getTime()
      );
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalAmount(daysDiff * selectedRoom.billing_amount);
    }
  }, [dates.checkInDate, dates.checkOutDate, selectedRoom.billing_amount]);

  const handlePayment = async () => {
    const paymentDetails = {
      account_id: 1, // Example account ID
      billing_amount: totalAmount,
      billing_currency: "ZAR",
      processing_currency: "USD",
      checkin_date: dates.checkInDate?.toISOString().split("T")[0],
      checkout_date: dates.checkOutDate?.toISOString().split("T")[0],
      description: selectedRoom.description,
      product: selectedRoom.product,
      customer: customerDetails.name,
      customer_email: customerDetails.email,
      customer_phone_number: customerDetails.phone,
      callback_url: "https://www.guesthouse.com",
      success_redirect_url: "https://turnstay.com/",
      failed_redirect_url: "https://www.google.com/",
      payment_url_style: "embed",
      payment_type: "Card Payment",
    };

    try {
      console.log("Sending payload:", JSON.stringify(paymentDetails, null, 2));
      const response = await axios.post(
        "http://localhost:5000/api/create-payment-intent",
        paymentDetails
      );
      console.log("Payment Intent Response:", response.data);

      // Check if the response contains the payment URL and open it in a new window
      if (response.data.turnstay_payment_url) {
        window.open(response.data.turnstay_payment_url, "_blank");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error creating payment intent:", error.response.data);
          setErrorMessage("Payment was not successful. Please try again.");
        } else {
          console.error("Error creating payment intent:", error.message);
          setErrorMessage("Payment was not successful. Please try again.");
        }
      } else {
        console.error("Error creating payment intent:", error);
        setErrorMessage("Payment was not successful. Please try again.");
      }
    }
  };

  return (
    <div className="summary-form">
      <h2>Summary</h2>
      <div className="summary-details">
        <h3>Room Details</h3>
        <p>{selectedRoom.product}</p>
        <p>{selectedRoom.description}</p>
        <p>
          Billing Amount per Night: $
          {selectedRoom.billing_amount?.toLocaleString()}
        </p>
      </div>
      <div className="summary-details">
        <h3>Customer Details</h3>
        <p>Name: {customerDetails.name}</p>
        <p>Email: {customerDetails.email}</p>
        <p>Phone: {customerDetails.phone}</p>
      </div>
      <div className="summary-details">
        <h3>Dates</h3>
        <p>Check-In: {dates.checkInDate?.toLocaleDateString()}</p>
        <p>Check-Out: {dates.checkOutDate?.toLocaleDateString()}</p>
      </div>
      <div className="summary-details">
        <h3>Total Amount</h3>
        <p>${totalAmount.toLocaleString()}</p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default SummaryForm;
