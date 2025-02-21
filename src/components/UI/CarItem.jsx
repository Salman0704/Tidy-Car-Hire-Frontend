import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
// import BookingForm from "./BookingForm";
import { useNavigate } from "react-router-dom";

const CarItem = (props) => {
  const navigate= useNavigate();
  // console.log(props.item)
  const { imgUrl, model, carName, automatic, speed, price, _id } = props.item || {};
  // console.log(props.item)
  const formData= props.formData || {}
  // console.log(formData)


  const handleDetailsClick = () => {
    // Navigate to the details page with car details and formData
    navigate(`/cars/${_id}`, {
      state: {

        formData: formData, // Pass form data
      },
    });
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
          £{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          {/* <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/booking/${price}`}>Rent</Link>
          </button> */}

          <button className=" w-50 car__item-btn car__btn-details"  onClick={handleDetailsClick}>
            Details
            {/* <Link to={`/cars/${_id}`}>Details</Link> */}
            {/* {navigate(`/cars/${_id}`, {state:{formData}})} */}
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
