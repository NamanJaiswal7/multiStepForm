import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationInfo, updateStep } from "../redux/formSlice";
import axios from "axios";

const LocationForm = () => {
  const dispatch = useDispatch();
  const locationInfo = useSelector((state) => state.form.locationInfo);
  const { country } = locationInfo;

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchCities = async (countryCode) => {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`,
      {
        headers: {
          "X-RapidAPI-Key":
            "db053142e2msh3e4496d5b33bb96p1d9fe8jsn3a60ef2c235a",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    return response.data.data.map((city) => ({ name: city.name }));
  };

  /**
   * Fetch all countries
   */
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countryList = res.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryList);
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  /**
   * Sets the city
   */
  useEffect(() => {
    if (country) {
      const selectedCountryCode = countries.find(
        (c) => c.name === country
      )?.code;
      if (selectedCountryCode) {
        fetchCities(selectedCountryCode)
          .then(setCities)
          .catch((err) => console.error("Error fetching cities:", err));
      }
    }
  }, [country, countries]);

  /**
   * Fetch places based on country code
   */
  const getCity = (countryCode) => {
    fetchCities()
      .then((res) => setCities(res.data.data))
      .catch((err) => console.error("Error fetching cities:", err));
  };

  /**
   * validate country and city.
   */
  const validate = () => {
    const newErrors = {};
    if (!locationInfo.country) newErrors.country = "Country is required.";
    if (!locationInfo.city) newErrors.city = "City is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle the navigation in the form
   */
  const handleNext = () => {
    if (validate()) dispatch(updateStep(3));
  };

  /**
   * Update store based on selection
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateLocationInfo({ [name]: value }));

    if (name === "country") {
      const countryCode = countries.find(
        (country) => country.name === value
      )?.code;
      if (countryCode) fetchCities(countryCode);
    }
  };

  return (
    <div>
      <h2>Step 2: Location Information</h2>

      <select
        name="country"
        value={locationInfo.country}
        onChange={handleChange}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.country && <p>{errors.country}</p>}

      <select name="city" value={locationInfo.city} onChange={handleChange}>
        <option value="">Select City</option>
        {cities.map((city, idx) => (
          <option key={idx} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {errors.city && <p>{errors.city}</p>}

      <button onClick={() => dispatch(updateStep(1))}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default LocationForm;
