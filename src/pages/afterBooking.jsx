import React,{useState} from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { environment } from "../constant";
import { loadStripe } from "@stripe/stripe-js";


// const [paymentSucceeded, setPaymentSucceeded] = useState(false);

// Stripe hooks (only used for card payments)


const NavigationPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    //   const [error, setError] = useState(null);
      const [successMessage, setSuccessMessage] = useState("");
      const [existingBookings, setExistingBookings] = useState([]);
    
const [processing, setProcessing] = useState(false);
  // Retrieve the booking data from the navigation state
  const location = useLocation();

  const bookingData = location.state || {
    title: "No booking data available",
  };

 // submit handler to create a payment session
  const handleSubmitPayment= async(e)=>{
    const stripe = await loadStripe(environment.stripe_publishable_key);
    const apiUrl = environment.base + "/booking/add";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });
  
        const result = await response.json();
        if (result.subCode === 200) {
          // Optionally send email after booking is added
          const emailResponse = await fetch(environment.base + "/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result.items),
          });
          const emailResult = await emailResponse.json();
          if (emailResult.subCode === 200) {
            // console.log(result.items);
            setError(null);
            
            
            setSuccessMessage(
              "Thanks for Booking! Your request has been successfully submitted."
            );
            try{
                console.log("hiii")
                const response = await fetch(environment.base + "/payment/session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ car_id:bookingData.carId, price:bookingData.price, _id:bookingData._id }),
                });
                const data= await response.json()
                const result=stripe.redirectToCheckout({
                  sessionId: data.items.id
                })
                if(result.error){
                  console.log(result.error)
                }
              }catch(err){
                console.error("Error creating payment intent:", err);
                setError("Error creating payment intent.");
              }
            
          } else {
            setError("Booking has been updated in DB but email is not sent");
          }
        } else {
          setError("API is not working. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while connecting to the API.");
      }
    e.preventDefault();
    setProcessing(true);
    setError("");
    try{
      console.log("hiii")
      const response = await fetch(environment.base + "/payment/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id:bookingData.carId, price:bookingData.price, _id:bookingData._id }),
      });
      const data= await response.json()
      const result=stripe.redirectToCheckout({
        sessionId: data.items.id
      })
      if(result.error){
        console.log(result.error)
      }
    }catch(err){
      console.error("Error creating payment intent:", err);
      setError("Error creating payment intent.");
    }
  }
  const submitHandler = async (event) => {
      event.preventDefault();
      // Prevent submission if there is an overlap error
      if (error) {
        return;
      }
      const apiUrl = environment.base + "/booking/add";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });
  
        const result = await response.json();
        if (result.subCode === 200) {
          // Optionally send email after booking is added
          const emailResponse = await fetch(environment.base + "/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result.items),
          });
          const emailResult = await emailResponse.json();
          if (emailResult.subCode === 200) {
            // console.log(result.items);
            setError(null);
            
            
            setSuccessMessage(
              "Thanks for Booking! Your request has been successfully submitted."
            );
            navigate("/booking/success");
            
          } else {
            setError("Booking has been updated in DB but email is not sent");
          }
        } else {
          setError("API is not working. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while connecting to the API.");
      }
    };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Navigation Page</h1>
      {/* <section style={{ margin: "20px 0" }}>
        <h2>Booking Data:</h2>
        <pre
          style={{
            backgroundColor: "#f7f7f7",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(bookingData, null, 2)}
        </pre>
      </section> */}
      <section>
        <button style={{ marginRight: "10px", padding: "10px 20px" }} 
        onClick={handleSubmitPayment}>
          Pay Now
        </button>
        <button style={{ padding: "10px 20px" }} onClick={submitHandler}>
          Pay On Arrival
        </button>
      </section>
    </div>
  );
};

export default NavigationPage;
