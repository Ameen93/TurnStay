// src/CustomerDetailsForm.tsx
import React from "react";
import { useForm, SubmitHandler, WatchObserver } from "react-hook-form";

interface ICustomerDetails {
  name: string;
  email: string;
  phone: string;
}

interface CustomerDetailsFormProps {
  onChange: (data: Partial<ICustomerDetails>) => void;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  onChange,
}) => {
  const { register, watch } = useForm<ICustomerDetails>();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="customer-details-form">
      <h2>Customer Details</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input id="name" {...register("name", { required: true })} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Customer Phone Number</label>
          <input
            id="phone"
            {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
