import React,{useState} from "react"
import {Form, FormGroup} from "reactstrap"

import "../../styles/find-car-form.css";
import { environment } from "../../constant";




const CommentForm=({id})=>{
    const [formData, setFormData]= useState({
        fullName:"",
        email:"",
        comment:""
    })
    const [error, setError]= useState(null);
    const [successMessage, setSuccessMesage]= useState("")
      
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleComment = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Form submitted");
        // console.log(base)
    
        const apiUrl = environment.base+`/blog/addComment/${id}`;
    
        try {
          // Use POST method to send data in the body
          const response = await fetch(apiUrl, {
            method: "POST", // Change to POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          console.log(result)
          if (result.subCode === 200) {
            setFormData({
              fullName:"",
              email:"",
              comment:""
            })
            // setCars(result.items); // Store car data in state
            // console.log(result)
            setSuccessMesage("API hit successfully");
            console.log(successMessage)
            setError(null);
          } else {
            setError("API is not working. Please try again.");
            console.log(error);
            // setCars([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("An error occurred while connecting to the API.");
        //   setCars([]);
        }
      };
    return(
        
        <Form className="form" onSubmit={handleComment}>
            <>
            <FormGroup className=" d-flex gap-3">
            {/* <FormGroup className="form__group"> */}

             <input
             type="text" 
             placeholder="Full name"
             name="fullName"
             value={formData.fullName}
             onChange={handleChange}
             required 
             />
             {/* </FormGroup>
        <FormGroup className=" form__group"> */}
            <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
           </FormGroup>

    <FormGroup>
    <textarea
        rows="5"
        className="w-100 py-2 px-3"
        placeholder="Comment..."
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        required
    ></textarea>
    </FormGroup>

    <button type="submit" className="btn comment__btn mt-3">
    Post a Comment
    </button>
            </>

</Form>

    )
    
}

export default CommentForm;


   