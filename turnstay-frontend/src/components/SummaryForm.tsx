// src/SummaryForm.tsx
import React from "react";

interface SummaryFormProps {
  selectedRoom: any;
  customerDetails: any;
  dates: any;
}

const SummaryForm: React.FC<SummaryFormProps> = ({
  selectedRoom,
  customerDetails,
  dates,
}) => {
  return (
    <div className="summary-form">
      <h2>Summary</h2>
      <div className="summary-details">
        <h3>Room Details</h3>
        <p>{selectedRoom.product}</p>
        <p>{selectedRoom.description}</p>
        <p>Billing Amount: ${selectedRoom.billing_amount?.toLocaleString()}</p>
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
      <button>Pay</button>
    </div>
  );
};

export default SummaryForm;
