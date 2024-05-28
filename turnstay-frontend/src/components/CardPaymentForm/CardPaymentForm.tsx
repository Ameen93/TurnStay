import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CardPaymentForm.css";

interface IFormInput {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const CardPaymentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name on Card</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          {...register("cardNumber", {
            required: true,
            pattern: /^[0-9]{16}$/,
          })}
        />
        {errors.cardNumber && (
          <span>This field is required and must be 16 digits</span>
        )}
      </div>

      <div>
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input
          id="expiryDate"
          {...register("expiryDate", {
            required: true,
            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          })}
        />
        {errors.expiryDate && (
          <span>This field is required and must be in MM/YY format</span>
        )}
      </div>

      <div>
        <label htmlFor="cvc">CVC</label>
        <input
          id="cvc"
          {...register("cvc", { required: true, pattern: /^[0-9]{3,4}$/ })}
        />
        {errors.cvc && (
          <span>This field is required and must be 3 or 4 digits</span>
        )}
      </div>

      <button type="submit">Pay</button>
    </form>
  );
};

export default CardPaymentForm;
