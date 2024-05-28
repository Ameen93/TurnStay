// src/App.tsx
import React, { useState } from "react";
import "./App.css";
import CardPaymentForm from "./components/CardPaymentForm/CardPaymentForm";
import DatePickerForm from "./components/DatePicker/DatePicker";
import CustomerDetailsForm from "./components/CustomerDetailsForm/CustomerDetailsForm";
import RoomInfo from "./components/RoomInfo/RoomInfo";
import SummaryForm from "./components/SummaryForm";

const App: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>({});
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [dates, setDates] = useState<{
    checkInDate: Date | null;
    checkOutDate: Date | null;
  }>({ checkInDate: null, checkOutDate: null });

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
  };

  const handleCustomerDetailsChange = (details: any) => {
    setCustomerDetails(details);
  };

  const handleDatesChange = (newDates: any) => {
    setDates(newDates);
  };

  return (
    <div className="App">
      <div className="form-container">
        <CustomerDetailsForm onChange={handleCustomerDetailsChange} />
        <DatePickerForm onChange={handleDatesChange} />
        <RoomInfo onSelect={handleRoomSelect} />
      </div>
      <div className="summary-container">
        <SummaryForm
          selectedRoom={selectedRoom}
          customerDetails={customerDetails}
          dates={dates}
        />
      </div>
    </div>
  );
};

export default App;
