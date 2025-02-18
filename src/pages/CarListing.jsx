import React,{useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
// import carData from "../assets/data/carData";
import { environment } from "../constant";


const CarListing = () => {
  const [carData, setCarData] = useState([]); // State to store car data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch car data from the API
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(environment.base+"/services/getCarByStatus"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        // console.log(data.items)
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
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
