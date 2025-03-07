import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { environment } from "../../constant";

import { useNavigate } from "react-router-dom";

const FindCarForm = ({setCars}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    vehicleType: "car",
    dropoffDate: "",
    dropoffTime: "",
  });

  // const [cars, setCars] = useState([]); // State to store cars from API
  const [error, setError] = useState(null);

   // Apply a red border style if there is an overlap error.
   const dateInputStyle = error ? { border: "2px solid red" } : {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFindCar = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  //   console.log("Form submitted");
  //   // console.log(base)

  //   const apiUrl = environment.base + '/services/demand';

  //   try {
  //     // Use POST method to send data in the body
  //     const response = await fetch(apiUrl, {
  //       method: "POST", // Change to POST
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();
  //     console.log(result)
  //     if (result.subCode === 200) {
  //       setCars(result.items); // Store car data in state
  //       // console.log(result)
  //       console.log("API hit successfully");
  //       // console.log(base)
  //       setError(null);
  //     } else {
  //       setError("API is not working. Please try again.");
  //       console.log(error);
  //       setCars([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("An error occurred while connecting to the API.");
  //     // console.log(error)
  //     setCars([]);
  //   }
  // };



  const handleFindCar = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Redirect to /car route with form data as state
    navigate("/cars", { state: { formData } });
  };

  return (
    <Form className="form" onSubmit={handleFindCar}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <label>Pick-up Date</label>
          <input
            type="date"
            placeholder="Pick-Up Date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            style={dateInputStyle}
          />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Pick-up Time</label>
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="select__group">
          <label>Vehicle Type</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          >
            <option value="car">Cars</option>
            <option value="electric car">Electric Cars</option>
            <option value="van">Vans</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <label>Drop-off Date</label>
          <input
            type="date"
            name="dropoffDate"
            value={formData.dropoffDate}
            onChange={handleChange}
            placeholder="Drop-off Date"
            required
            min={formData.pickupDate || new Date().toISOString().split("T")[0]}
          />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Drop-off Time</label>
          <input
            type="time"
            name="dropoffTime"
            value={formData.dropoffTime}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <button type="submit" className="btn find__car-btn">
            View Vehicles
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;