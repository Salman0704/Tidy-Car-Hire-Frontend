import { useState } from "react";
const Newsletter = () => {
    const [email, setEmail] = useState("");


  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/contactUs/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Subscription successful!");
        setEmail(""); // Clear input field after success
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="newsletter">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span onClick={handleSubscribe} >
        <i className="ri-send-plane-line"></i>
      </span>
    </div>
  );
}

  export default Newsletter;