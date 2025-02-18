import React,{useState} from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
//  import Newsletter from './newsletter'
 import { environment } from "../../constant";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/blogs",
    display: "Blog",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {



  const [email, setEmail] = useState(""); // State to store the email input
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [message, setMessage] = useState(""); // State to handle success/error messages

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(environment.base+"/contactUs/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.json().item.subCode!==200) {
        throw new Error("Failed to subscribe");
      }

      // const data = await response.json();
      setMessage("Subscription successful! Thank you.");
      console.log(message)
      setEmail(""); // Clear the input field
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>
                    Tidy Car <br /> Hire
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            At Tidy Car Hire, we don’t only provide cars, we assure luxury and comfort. Trust us to provide a premium rental experience that reflects our commitment to excellence, quality and reliability.
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Unit 7, Link Park Heathrow, Thorny Road Mill Road, West Dryton UB7 7EZ</p>
              <p className="office__info">Phone: +44 333 335 5553</p>

              <p className="office__info">Email: admin@thetcgltd.com
              </p>

              {/* <p className="office__info">Office Time: 10am - 7pm</p> */}
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        disabled={loading} // Disable input while loading
      />
      <span onClick={handleSubmit} style={{ cursor: "pointer" }}>
        <i className="ri-send-plane-line"></i>
      </span>
      {/* {message && <p>{message}</p>} */}
    </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i className="ri-copyright-line"></i>Copyright {year}, Developed by
                Salman Ali Sayyed. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
