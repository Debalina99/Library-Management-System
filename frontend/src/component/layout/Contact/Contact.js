import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h2 className="text-decoration-none">For additional Queries :</h2>
      
      <a className="mailBtn" href="#">
      
        <Button>Phone No: 5556667788</Button>
        <br/>
        <Button>Mail: University@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
