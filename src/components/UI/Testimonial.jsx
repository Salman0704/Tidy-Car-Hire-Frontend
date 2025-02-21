import React , {useEffect, useState} from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

// import ava01 from "../../assets/all-images/ava-1.jpg";
// import ava02 from "../../assets/all-images/ava-2.jpg";
// import ava03 from "../../assets/all-images/ava-3.jpg";
// import ava04 from "../../assets/all-images/ava-4.jpg";
import { environment } from "../../constant";




const Testimonial = () => {
  const [testimonials, setTestimonials]= useState([]);
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState(null);


  const api_url= environment.base+"/testimonial/all"
  useEffect(()=>{
    const fetchTestimonials= async()=>{
      try{
        const response= await fetch(api_url);
        const data=await response.json();
        if(data.subCode===200){
          setTestimonials(data.items);
        }else{
          setError("Failed to load testimonials")
        }
      }catch(error){
        setError("An error occurred while fewtching testimonials.")
      }finally{
        setLoading(false)
      }
    };
    fetchTestimonials()
  })
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
    {loading && <p>Loading testimonials...</p>}
    {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial py-4 px-3">
              <p className="section__description">{testimonial.description}</p>

              <div className="mt-3 d-flex align-items-center gap-4">
                {/* <img src={testimonial.image} alt={testimonial.name} className="w-25 h-25 rounded-2" /> */}
                <div>
                  <h6 className="mb-0 mt-3">{testimonial.name}</h6>
                  <p className="section__description">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      </div>
    // <Slider {...settings}>
    //   <div className="testimonial py-4 px-3">
    //     <p className="section__description">
    //       Have been fortunate enough to try there services as I have to go to the wedding and my car broke so a friend suggested me Tidy Car Hire. Good support Good price.
    //     </p>

    //     <div className="mt-3 d-flex align-items-center gap-4">
    //       <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

    //       <div>
    //         <h6 className="mb-0 mt-3">Khalid Mohammed</h6>
    //         <p className="section__description">Customer</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="testimonial py-4 px-3">
    //     <p className="section__description">
    //       Will be happy to try them again
    //     </p>

    //     <div className="mt-3 d-flex align-items-center gap-4">
    //       <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

    //       <div>
    //         <h6 className="mb-0 mt-3">Abihul Hasan</h6>
    //         <p className="section__description">Customer</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="testimonial py-4 px-3">
    //     <p className="section__description">
    //       Born to be awesome and got to be one after hiring a car at a event where I cracked a million pounds deal. Hope they are lucky, Malik we will be back soon 
    //     </p>

    //     <div className="mt-3 d-flex align-items-center gap-4">
    //       <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

    //       <div>
    //         <h6 className="mb-0 mt-3">Salman Ali Sayyed</h6>
    //         <p className="section__description">Customer</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <div className="testimonial py-4 px-3">
    //     <p className="section__description">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni
    //       explicabo molestias recusandae repudiandae, dolor, sapiente placeat
    //       ab, animi eum minima nulla facere aliquam aut vitae quo pariatur
    //       voluptate odit?
    //     </p>

    //     <div className="mt-3 d-flex align-items-center gap-4">
    //       <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

    //       <div>
    //         <h6 className="mb-0 mt-3">Jhon Doe</h6>
    //         <p className="section__description">Customer</p>
    //       </div>
    //     </div>
    //   </div> */}
    // </Slider>
  );
};

export default Testimonial;
