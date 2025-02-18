import React,{useEffect, useState} from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
// import { Link } from "react-router-dom";
import Slider from "react-slick";


import { environment } from "../../constant";

// const OUR__MEMBERS = [
//   {
//     name: "Audi",
//     // experience: "5 years of experience",
//     carUrl: "#",
//     // instUrl: "#",
//     // twitUrl: "#",
//     // linkedinUrl: "#",
//     imgUrl: ava01,
//   },

//   {
//     name: "Bentley",
//     // experience: "5 years of experience",
//     carUrl: "#",
//     // instUrl: "#",
//     // twitUrl: "#",
//     // linkedinUrl: "#",
//     imgUrl: ava02,
//   },

//   {
//     name: "BMW",
//     // experience: "5 years of experience",
//     carUrl: "#",
//     // instUrl: "#",
//     // twitUrl: "#",
//     // linkedinUrl: "#",
//     imgUrl: ava03,
//   },

//   {
//     name: "Mercedes",
//     // experience: "5 years of experience",
//     carUrl: "#",
//     // instUrl: "#",
//     // twitUrl: "#",
//     // linkedinUrl: "#",
//     imgUrl: ava04,
//   },
// ];

const OurMembers = () => {
  const [brands,setBrands]= useState([])
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(environment.base+"/logo/all"); // Replace with actual API
        const data = await response.json();
        // console.log(data)
        if (data.subCode === 200) {
          setBrands(data.items); // Assuming brands are in `items`
        } else {
          throw new Error("Failed to fetch brands");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading && <p>Loading brands...</p>}
      {error && <p className="error">{error}</p>}

      <Slider {...settings}>
      {brands.map((brand, index) => (
        <Col lg="3" md="4" sm="6" xs="12" key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
              <img src={brand.imageUrl} alt={brand.name} className="w-100" />

              {/* <div className="single__member-social">
                <Link to="#">
                  <i className="ri-car-line"></i>
                </Link>
              </div> */}
            </div>

            {/* <h6 className="text-center mb-0 mt-3">{brand.name}</h6> */}
            {/* <p className="section__description text-center">{brand.description}</p> */}
          </div>
        </Col>
      ))}
      </Slider>

      
    </>
 
  );
};





export default OurMembers;
