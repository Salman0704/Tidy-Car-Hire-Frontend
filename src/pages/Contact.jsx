import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";
import { environment } from "../constant";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [contactData, setContactData]=useState({
    name:"",
    phone:"",
    email:"",
    subject:"",
    company:"",
    message:""
  })

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage]= useState("");
    const handleChange = (e) => {
      setContactData({ ...contactData, [e.target.name]: e.target.value });
    };


    const submitHandler = async(event) => {
      event.preventDefault();
      const apiUrl=environment.base+"/contactUs"
      try {
        // Use POST method to send data in the body
        const response = await fetch(apiUrl, {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });
  
        const result = await response.json();
        // console.log(result)
        if (result.subCode === 200) {
          // setContactData(result.message)
          setContactData({
            name:"",
            phone:"",
            email:"",
            subject:"",
            company:"",
            message:""
          })
          setSuccessMessage("Your inquiry has been submitted and one of our team member will contact you at the earliest")
          // setCars(result.items); // Store car data in state
          // console.log(result)
          console.log("API hit successfully");
          setError(null);
        } else {
          setError("API is not working. Please try again.");
          console.log(error);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while connecting to the API.");
        
      }
    };
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={submitHandler}>
                <FormGroup className="contact__form">
                  <label>Your Name</label>
                  <Input 
                  placeholder="Your Name" 
                  type="text" 
                  name="name"
                  value={contactData.name}
                  onChange={handleChange}
                  required

                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <label>Phone Number</label>
                  <Input 
                  placeholder="Phone NUmber" 
                  type="text" 
                  name="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  required
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <label>Email</label>
                  <Input 
                  placeholder="Email" 
                  type="email" 
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <label>Subject</label>
                  <Input 
                  placeholder="Subject" 
                  type="text" 
                  name="subject"
                  value={contactData.subject}
                  onChange={handleChange}

                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <label>Company</label>
                  <Input 
                  placeholder="Company" 
                  type="text" 
                  name="company"
                  value={contactData.company}
                  onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <label>Message</label>
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                  ></textarea>
                </FormGroup>

                {error && <div className="text-danger mb-3">{error}</div>}
      
                {successMessage && <div className="text-success mb-3">{successMessage}</div>}

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                Unit 7, Link Park Heathrow, Thorny Road Mill Road, West Dryton UB7 7EZ
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+44 333 335 5553</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">admin@thetcgltd.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
