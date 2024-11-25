import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo, updateStep } from "../redux/formSlice";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.form.personalInfo);

  const [errors, setErrors] = useState({});

  /**
   * Validate the personal info input
   */
  const validate = () => {
    const newErrors = {};
    if (!personalInfo.firstName) newErrors.firstName = "First name is required";
    if (
      !personalInfo.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    ) {
      newErrors.email = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Navigate to the form
   */
  const handleNext = () => {
    if (validate()) dispatch(updateStep(2));
  };

  /**
   * Store in the redux state with the input value.
   */
  const handleChange = (e) => {
    dispatch(updatePersonalInfo({ [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>Personal Information</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={personalInfo.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <p>{errors.firstName}</p>}

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={personalInfo.lastName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personalInfo.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={personalInfo.phone}
        onChange={handleChange}
      />

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PersonalInfoForm;
