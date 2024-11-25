import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the form fields
 */
const initialState = {
  step: 1,
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  locationInfo: {
    country: "",
    city: "",
  },
  paymentInfo: {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  },
};

/**
 * Actions for the forms
 */
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateLocationInfo: (state, action) => {
      state.locationInfo = { ...state.locationInfo, ...action.payload };
    },
    updatePaymentInfo: (state, action) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
    },
    resetForm: (state) => {
      return { ...state, ...initialState };
    },
  },
});

export const {
  updateStep,
  updatePersonalInfo,
  updateLocationInfo,
  updatePaymentInfo,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
