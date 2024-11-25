import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStep, resetForm } from "../redux/formSlice";
import { persistor } from "../redux/store";

const SummaryPage = () => {
  const dispatch = useDispatch();
  const { personalInfo, locationInfo, paymentInfo } = useSelector(
    (state) => state.form
  );

  /**
   * Reset the store clear local storage
   */
  const handleReset = () => {
    dispatch(resetForm());
    persistor.purge();
  };

  return (
    <div>
      <h2>Step 4: Summary</h2>
      <h3>Personal Information</h3>
      <p>First Name: {personalInfo.firstName}</p>
      <p>Last Name: {personalInfo.lastName}</p>
      <p>Email: {personalInfo.email}</p>
      <p>Phone: {personalInfo.phone}</p>

      <h3>Location Information</h3>
      <p>Country: {locationInfo.country}</p>
      <p>City: {locationInfo.city}</p>

      <h3>Payment Information</h3>
      <p>Card Number: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
      <p>Expiry Date: {paymentInfo.expiryDate}</p>

      <button onClick={() => dispatch(updateStep(3))}>Back</button>
      <button onClick={() => alert("Form submitted!")}>Submit</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SummaryPage;
