import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import { useParams } from "react-router-dom";
// import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
// import { Link } from "react-router-dom";
import CommentForm from "../components/UI/commentForm.jsx";

// import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";
import { environment } from "../constant.jsx";

const BlogDetails = () => {
  const { slug } = useParams();
  // const blog = blogData.find((blog) => blog.title === slug);
  const [blog, setBlog]= useState([]);
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState(null)

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(environment.base+`/blog/id/${slug}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setBlog(data.items); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogData();
  }, [slug]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Helmet title={blog.title}>
      <section>
        <Container>
          <Row>
            <Col lg="8" md="8">
              <div className="blog__details">
                <img src={blog.image} alt="" className="w-100" />
                <h2 className="section__title mt-4">{blog.title}</h2>

                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i className="ri-user-line"></i> {blog.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {blog.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {blog.time}
                  </span>
                </div>

                <p className="section__description">{blog.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{blog.quote}</blockquote>
                </h6>
                <p className="section__description">{blog.description}</p>
              </div>

              <div className="comment__list mt-5">
              <h4 className="mb-5">Comments ({blog.comments?.length || 0})</h4>

{blog.comments && blog.comments.length > 0 ? (
  blog.comments.map((comment, index) => (
    <div key={index} className="single__comment d-flex gap-3 mb-4">
      <div className="comment__content">
        <h6 className="fw-bold">{comment.fullName}</h6>
        <p className="section__description mb-0">{comment.email}</p>
        <p className="section__description">{comment.comment}</p>

        {/* {comment.replies && comment.replies.length > 0 && (
          <div className="comment__replies ms-5">
            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} className="single__comment d-flex gap-3 mt-3">
                <div className="comment__content">
                  <h6 className="fw-bold">{reply.fullName}</h6>
                  <p className="section__description mb-0">{reply.email}</p>
                  <p className="section__description">{reply.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <span className="replay d-flex align-items-center gap-1">
          <i className="ri-reply-line"></i> Reply
        </span> */}
      </div>
    </div>
  ))
) : (
  <p className="section__description">No comments yet. Be the first to comment!</p>
)}

                {/* =============== comment form ============ */}
                <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    
                  </p>
                  < CommentForm id={blog._id}/>

                  
                </div>
              </div>
            </Col>

            {/* <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Recent Posts</h5>
              </div>
              {blogData.map((item) => (
                <div className="recent__blog-post mb-4" key={item.id}>
                  <div className="recent__blog-item d-flex gap-3">
                    <img src={item.imgUrl} alt="" className="w-25 rounded-2" />
                    <h6>
                      <Link to={`/blogs/${item.title}`}>{blog.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BlogDetails;
