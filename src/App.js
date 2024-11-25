import React from "react";
import { useSelector } from "react-redux";
import PersonalInfoForm from "./components/PersonalInfoForm";
import LocationForm from "./components/LocationForm";
import PaymentForm from "./components/PaymentForm";
import SummaryPage from "./components/SummaryPage";

const App = () => {
  const step = useSelector((state) => state.form.step);

  /**
   * Render the pages based on the steps
   */
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <LocationForm />;
      case 3:
        return <PaymentForm />;
      case 4:
        return <SummaryPage />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return <div className="App">{renderStep()}</div>;
};

export default App;
