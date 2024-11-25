import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentInfo, updateStep } from "../redux/formSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const paymentInfo = useSelector((state) => state.form.paymentInfo);

  const [errors, setErrors] = useState({});

  /**
   * Validate the payment input.
   */
  const validate = () => {
    const newErrors = {};
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length !== 16) {
      newErrors.cardNumber = "A valid 16-digit card number is required.";
    }
    if (!paymentInfo.expiryDate)
      newErrors.expiryDate = "Expiry date is required.";
    if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) {
      newErrors.cvv = "A valid 3-digit CVV is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle navigation in the form.
   */
  const handleNext = () => {
    if (validate()) dispatch(updateStep(4));
  };

  /**
   * Store in the redux state when value change
   */
  const handleChange = (e) => {
    dispatch(updatePaymentInfo({ [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>Step 3: Payment Information</h2>

      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={paymentInfo.cardNumber}
        onChange={handleChange}
      />
      {errors.cardNumber && <p>{errors.cardNumber}</p>}

      <input
        type="text"
        name="expiryDate"
        placeholder="Expiry Date (MM/YY)"
        value={paymentInfo.expiryDate}
        onChange={handleChange}
      />
      {errors.expiryDate && <p>{errors.expiryDate}</p>}

      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={paymentInfo.cvv}
        onChange={handleChange}
      />
      {errors.cvv && <p>{errors.cvv}</p>}

      <button onClick={() => dispatch(updateStep(2))}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PaymentForm;
