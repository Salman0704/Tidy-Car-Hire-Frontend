import React, { useState } from "react";
import FindCarForm from "../components/UI/FindCarForm";
import CarItem from "../components/UI/CarItem";

const CarSearch = () => {
  const [cars, setCars] = useState([]); // Store cars globally
    // console.log("hi")
  return (
    <div>
      <FindCarForm setCars={setCars} />
      
      {/* Show cars if available */}
      {cars.length > 0 && (
        <div className="car-list">
          <h3>Available Cars</h3>
          <ul>
          {cars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarSearch;
