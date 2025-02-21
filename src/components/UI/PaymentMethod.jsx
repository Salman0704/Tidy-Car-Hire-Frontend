import React, { useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";
import { environment } from "../../constant";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentMethod = () => {
  // Input states for extra details
  const [carId, setCarId] = useState("");
  const [amount, setAmount] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Payment method & status states
  // const [paymentMethod, setPaymentMethod] = useState(""); // e.g., "direct-bank", "cheque", "master-card", "paypal"
  // const [clientSecret, setClientSecret] = useState("");
  // const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  // const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  // Stripe hooks (only used for card payments)
  const stripe = useStripe();
  



  // submit handler to create a payment session
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setProcessing(true);
    setError("");
    try{
      console.log("hiii")
      const response = await fetch(environment.base + "/payment/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id:carId, price:amount, _id:bookingId }),
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
 
  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="d-flex align-items-center gap-2">
        <label>Car ID</label>
        <input
          type="text"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          placeholder="Enter Car ID"
          required
        />
      </div>

      <div className="d-flex align-items-center gap-2">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="d-flex align-items-center gap-2">
        <label>Booking ID</label>
        <input
          type="text"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder="Enter Booking ID"
          required
        />
      </div>

      {/* Payment Method Selection
      <div className="payment">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="direct-bank"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cheque"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="master-card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Master Card
        </label>
        <img src={masterCard} alt="Master Card" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Paypal
        </label>
        <img src={paypal} alt="Paypal" />
      </div>

      {/* If the user selects Master Card, show card input */}
      {/* {paymentMethod === "master-card" && (
        <div className="card-element-wrapper">
          <label>Card Details</label>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
      {paymentSucceeded && (
        <div style={{ color: "green" }}>
          Payment succeeded! Your Payment ID is: {paymentId}
        </div>
      )}  */}

      <div className="payment text-end mt-5">
        <button type="submit" >
          {/* {processing ? "Processing..." : "Reserve Now"} */}
          Payment
        </button>
      </div>
    </form>
  );
};

export default PaymentMethod;
