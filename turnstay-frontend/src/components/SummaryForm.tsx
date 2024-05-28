// src/SummaryForm.tsx
import React, { useEffect, useState } from "react";

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
  }, [dates, selectedRoom]);

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
      <button>Pay</button>
    </div>
  );
};

export default SummaryForm;
