import React, { useState, useEffect, useCallback } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useNavigate , useParams } from "react-router-dom";
import { environment } from "../../constant";

const BookingForm = ({ setBooking, carItem, formData }) => {
  const { price: paramPrice } = useParams();
  // const pickData=pickData
  const pickData=formData.formData || {}
  const BASE_PRICE_PER_DAY = carItem.price || Number(paramPrice) || 0;
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    pickup_location: "",
    drop_location: "",
    start_date: pickData.pickupDate || "",
    end_date: pickData.dropoffDate  || "",
    pickupTime: pickData.pickupTime,
    dropoffTime:pickData.dropoffTime,
    car_id: carItem._id,
    car_category: carItem.carType,
    car_model: carItem.model,
    car_name: carItem.carName,
    car_brand: carItem.brand,
    user_email: "",
    user_name: "",
    price: BASE_PRICE_PER_DAY,
    user_phone: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [existingBookings, setExistingBookings] = useState([]);


    // Update start_date and end_date when pickData changes
    useEffect(() => {
      if (pickData) {
        setBookingData((prev) => ({
          ...prev,
          start_date: pickData.pickupDate,
          end_date: pickData.dropoffDate,
        }));
      }
    }, [pickData]);

  // Fetch existing bookings for this car
  useEffect(() => {
    if (carItem && carItem._id) {
      fetch(`${environment.base}/booking/carId/${carItem._id}`)
        .then((res) => res.json())
        .then((data) => {
          // Assume the API returns an object with an "items" array
          if (data && data.items) {
            setExistingBookings(data.items);
          }
        })
        .catch((err) => console.error("Error fetching bookings", err));
    }
  }, [carItem]);

  // Calculate number of days between two dates
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate price based on days and car category
  const calculatePrice = useCallback(
    (days, category) => {
      let multiplier = 1;
      switch (category) {
        case "electric car":
          multiplier = 1; // Adjust multiplier if needed
          break;
        case "van":
          multiplier = 1; // Adjust multiplier if needed
          break;
        default:
          multiplier = 1;
      }
      return Math.round(BASE_PRICE_PER_DAY * days * multiplier);
    },
    [BASE_PRICE_PER_DAY]
  );


  //  // Calculate days and price whenever dates change
  //  useEffect(() => {
  //   if (pickData) {
  //     console.log(pickData.dropoffDate)
  //     console.log(pickData.pickupDate)

  //     const days = Math.ceil(
  //       (new Date(pickData.dropoffDate) - new Date(pickData.pickupDate)) / 
  //       (1000 * 60 * 60 * 24)
  //     );
      
  //     setBookingData(prev => ({
  //       ...prev,
  //       start_date: pickData.pickupDate,
  //       end_date: pickData.dropoffDate,
  //       price: BASE_PRICE_PER_DAY * days
  //     }));
  //   }
  // }, [pickData, BASE_PRICE_PER_DAY]);

  // Update price when dates or car category changes
  useEffect(() => {
    const days = calculateDays(bookingData.start_date, bookingData.end_date);
    const newPrice = calculatePrice(days, bookingData.car_category);
    setBookingData((prev) => ({ ...prev, price: newPrice }));
  }, [
    bookingData.start_date,
    bookingData.end_date,
    bookingData.car_category,
    calculatePrice,
  ]);

  // Check if the chosen date range overlaps with any existing booking
  const isOverlapping = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    for (let booking of existingBookings) {
      // Assuming booking.start_date and booking.end_date are in ISO format
      let bookedStart = new Date(booking.start_date);
      let bookedEnd = new Date(booking.end_date);
      // Check for overlap
      if (startDate <= bookedEnd && endDate >= bookedStart) {
        return false; // change it to true when you want to restrict the booked dates
      }
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newBookingData = { ...bookingData, [name]: value };
    setBookingData(newBookingData);

    // When both dates are selected, check for overlapping bookings.
    if (newBookingData.start_date && newBookingData.end_date) {
      if (isOverlapping(newBookingData.start_date, newBookingData.end_date)) {
        setError(
          "Please select a different date or different car as these dates are already approved for another booking."
        );
      } else {
        setError(null);
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // Prevent submission if there is an overlap error
    if (error) {
      return;
    }
    navigate("/booking/navigation",{ state: bookingData });
    // const apiUrl = environment.base + "/booking/add";
    // try {
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bookingData),
    //   });

    //   const result = await response.json();
    //   if (result.subCode === 200) {
    //     // Optionally send email after booking is added
    //     const emailResponse = await fetch(environment.base + "/email/send", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(result.items),
    //     });
    //     const emailResult = await emailResponse.json();
    //     if (emailResult.subCode === 200) {
    //       // console.log(result.items);
    //       setError(null);
    //       setBookingData({
    //         pickup_location: "",
    //         drop_location: "",
    //         start_date: pickData.pickupDate,
    //         end_date: pickData.dropoffDate,
    //         car_category: carItem.carType,
    //         car_model: carItem.model,
    //         car_name: carItem.carName,
    //         car_brand: carItem.brand,
    //         user_email: "",
    //         user_name: "",
    //         price: BASE_PRICE_PER_DAY,
    //         user_phone: "",
    //       });
          
    //       setSuccessMessage(
    //         "Thanks for Booking! Your request has been successfully submitted."
    //       );
    //       navigate("/booking/navigation",{ state: result.items });
          
    //     } else {
    //       setError("Booking has been updated in DB but email is not sent");
    //     }
    //   } else {
    //     setError("API is not working. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   setError("An error occurred while connecting to the API.");
    // }
  };

  // Apply a red border style if there is an overlap error.
  const dateInputStyle = error ? { border: "2px solid red" } : {};

// Date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Pick-Up Location</label>
        <select
          name="pickup_location"
          value={bookingData.pickup_location}
          onChange={handleChange}
        >
          <option value="London Heathrow">London Heathrow</option>
          <option value="London Luton">London Luton</option>
          <option value="London Gatwick">London Gatwick</option>
          <option value="Dubai">Dubai</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Drop-off Location</label>
        <select
          name="drop_location"
          value={bookingData.drop_location}
          onChange={handleChange}
        >
          <option value="London Heathrow">London Heathrow</option>
          <option value="London Luton">London Luton</option>
          <option value="London Gatwick">London Gatwick</option>
          <option value="Dubai">Dubai</option>
        </select>
      </FormGroup>


      {/* Display Dates Read-Only
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Booking Period</label>
        <div className="date-display">
          {formatDate(bookingData.start_date)} - {formatDate(bookingData.end_date)}
        </div>
        <div className="price-summary">
          {Math.ceil(
            (new Date(bookingData.end_date) - new Date(bookingData.start_date)) / 
            (1000 * 60 * 60 * 24)
          )} days × £{BASE_PRICE_PER_DAY}/day = £{bookingData.price}
        </div>
      </FormGroup> */}
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Start Date</label>
        <input
          type="date"
          name="start_date"
          value={bookingData.start_date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]} // Prevent past dates
          style={dateInputStyle}
        />
        {/* <p>Readable Start Date: {formatDate(bookingData.start_date)}</p> */}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>End Date</label>
        <input
          type="date"
          name="end_date"
          value={bookingData.end_date}
          onChange={handleChange}
          required
          min={bookingData.start_date || new Date().toISOString().split("T")[0]}
          style={dateInputStyle}
        />
          {/* <p>Readable End Date: {formatDate(bookingData.end_date)}</p> */}
      </FormGroup>

      {/* Display overlap error message below the date fields */}
      {error && (
        <div className="text-danger mb-3" style={{ fontSize: "0.9em" }}>
          {error}
        </div>
      )}

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="user_email"
          value={bookingData.user_email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Name"
          name="user_name"
          value={bookingData.user_name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={bookingData.price}
          readOnly
          className="bg-light"
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          name="user_phone"
          value={bookingData.user_phone}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Instructions</label>
        <textarea
          rows={5}
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>

      {successMessage && (
        <div className="text-success mb-3">{successMessage}</div>
      )}

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <button type="submit" className="btn find__car-btn" disabled={!!error}>
          Proceed
        </button>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
