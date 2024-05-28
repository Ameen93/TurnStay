// src/DatePickerForm.tsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFormProps {
  onChange: (dates: {
    checkInDate: Date | null;
    checkOutDate: Date | null;
  }) => void;
}

const DatePickerForm: React.FC<DatePickerFormProps> = ({ onChange }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  useEffect(() => {
    onChange({ checkInDate, checkOutDate });
  }, [checkInDate, checkOutDate, onChange]);

  return (
    <div className="date-picker-form">
      <div className="form-group">
        <label htmlFor="checkInDate">Check-In Date</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date: Date | null) => setCheckInDate(date)}
          dateFormat="MM/dd/yyyy"
          className="date-picker"
        />
      </div>

      <div className="form-group">
        <label htmlFor="checkOutDate">Check-Out Date</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date: Date | null) => setCheckOutDate(date)}
          dateFormat="MM/dd/yyyy"
          className="date-picker"
        />
      </div>
    </div>
  );
};

export default DatePickerForm;
