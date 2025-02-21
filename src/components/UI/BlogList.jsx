import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
// import blogData from "../../assets/data/blogData";
// import { useParams } from 'react-router-dom';
import { environment } from "../../constant";

const BlogList = () => {

  const [blogData, setBlogData]= useState([])
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState(null)
 useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(environment.base+"/blog/all"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setBlogData(data.items); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogData();
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
    <>
      {blogData.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {
  const { image, title, author, date, description, time, id } = item;

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={image} alt="" className="w-100" />
        <div className="blog__info p-3">
          {/* <Link to={`/blogs/${title}`} className="blog__title">
            {title}
          </Link> */}
          {title}
          <p className="section__description mt-3">
            {description.length > 100
              ? description.substr(0, 100)
              : description}
          </p>

          <Link to={`/blogs/${id}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {date}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;
