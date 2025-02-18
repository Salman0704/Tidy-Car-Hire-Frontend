import React,{useEffect, useState} from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
// import FindCarForm from "../components/UI/FindCarForm";
import CarSearch from "./CarSearch";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
// import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
// import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

// import BlogList from "../components/UI/BlogList";



const Home = () => {
  const [carData, setCarData] = useState([]); // State to store car data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
  
    // Fetch car data from the API
    useEffect(() => {
      const fetchCarData = async () => {
        try {
          const response = await fetch("http://localhost:8080/services/type"); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch car data");
          }
          const data = await response.json();
          setCarData(data.items); // Update state with fetched data
        } catch (error) {
          setError(error.message); // Set error message if something goes wrong
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };
  
      fetchCarData();
    }, []); // Empty dependency array ensures this runs only once on mount
  
    // Display loading state
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Display error state
    if (error) {
      return <div>Error: {error}</div>;
    }
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Welcome to Tidy Car Hire</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <CarSearch />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Featured</h6>
              <h2 className="section__title">Cars</h2>
            </Col>

            {/* {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))} */}
            {carData.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============
      <BecomeDriverSection /> */}

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
