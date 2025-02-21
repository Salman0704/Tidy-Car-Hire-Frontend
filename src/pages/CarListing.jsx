import React,{useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
// import carData from "../assets/data/carData";
import { environment } from "../constant";
import { useLocation } from "react-router-dom";


const CarListing = () => {
  const [carData, setCarData] = useState([]); // State to store car data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const location=useLocation();
  const {formData}=location.state|| {}

  // Fetch car data from the API
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        let response
        if(formData){
          response = await fetch(environment.base+`/services/getCarByCategory/${formData.vehicleType}`); // Replace with your API endpoint
        }else{
          response=await fetch(environment.base+`/services/getCarByStatus`);
        }
        // console.log(response)
        const data = await response.json();
        if (data.subCode!==200) {
          setCarData(null)
          throw new Error("Failed to fetch car data");
          
        }else{
          
        // console.log(data.items)
        setCarData(data.items); // Update state with fetched data
        }
        
      } catch (error) {
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCarData();
  }, [formData]); // Empty dependency array ensures this runs only once on mount

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
              <CarItem item={item} formData={formData} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
