import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface DatePickerFormProps {
  onChange: (dates: {
    checkInDate: Date | null;
    checkOutDate: Date | null;
  }) => void;
}

const DatePickerForm: React.FC<DatePickerFormProps> = ({ onChange }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{
    checkInDate?: string;
    checkOutDate?: string;
  }>({});

  useEffect(() => {
    onChange({ checkInDate, checkOutDate });
  }, [checkInDate, checkOutDate, onChange]);

  const handleCheckInDateChange = (date: Date | null) => {
    setCheckInDate(date);
    if (date && checkOutDate && date > checkOutDate) {
      setErrors((prev) => ({
        ...prev,
        checkInDate: "Check-in date cannot be after check-out date",
      }));
    } else {
      setErrors((prev) => ({ ...prev, checkInDate: undefined }));
    }
  };

  const handleCheckOutDateChange = (date: Date | null) => {
    setCheckOutDate(date);
    if (checkInDate && date && date < checkInDate) {
      setErrors((prev) => ({
        ...prev,
        checkOutDate: "Check-out date cannot be before check-in date",
      }));
    } else {
      setErrors((prev) => ({ ...prev, checkOutDate: undefined }));
    }
  };

  const today = new Date();

  return (
    <div className="date-picker-form">
      <div className="form-group">
        <label htmlFor="checkInDate">Check-In Date</label>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          dateFormat="MM/dd/yyyy"
          className="date-picker"
          minDate={today}
        />
        {errors.checkInDate && (
          <span className="error">{errors.checkInDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="checkOutDate">Check-Out Date</label>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutDateChange}
          dateFormat="MM/dd/yyyy"
          className="date-picker"
          minDate={today}
        />
        {errors.checkOutDate && (
          <span className="error">{errors.checkOutDate}</span>
        )}
      </div>
    </div>
  );
};

export default DatePickerForm;
