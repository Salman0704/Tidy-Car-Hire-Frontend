import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import BookingForm from "../components/UI/BookingForm";
import PaymentSuccess from "../pages/payment_success";
import PaymentCancel from "../pages/payment_cancel";
import BookingSuccess from "../pages/booking_success";

import NavigationPage from "../pages/afterBooking";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/booking/:price" element={<BookingForm />} />
      <Route path="/payment/success" element={<PaymentSuccess/>}/>
      <Route path="/payment/cancel" element={<PaymentCancel/>}/>
      <Route path="/booking/success" element={<BookingSuccess/>}/>
      <Route path="/booking/navigation" element={<NavigationPage/>}/>


    </Routes>
  );
};

export default Routers;
