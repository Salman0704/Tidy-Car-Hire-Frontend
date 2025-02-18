import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
// import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Tailored Wedding Car Services for Your Day</h2>
              <p className="section__description">
              At Tidy Your wedding day will be the most important and beautiful event of your life. Let our wedding car experts work with you to plan your special day, from the selection and preparation of the wedding cars- choose from classic, vintage or contemporary-right down to the matching attire for our chauffeurs.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Comfort
                  
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Luxury
                  
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Affordable prices
                  
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Low Documentation
                  
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src="https://thetcgltd.com/wp-content/uploads/2024/03/kisspng-2016-rolls-royce-ghost-rolls-royce-phantom-drophea-white-rolls-royce-ghost-luxury-car-5a73273fd8d234.3242967615174961278881-2048x935.png" alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
