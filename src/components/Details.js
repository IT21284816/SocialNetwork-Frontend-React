import React, {useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";


function Details() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(localStorage.getItem("psnUserId"));

  const [userFullname] = useState(
    localStorage.getItem("psnUserFirstName")
     + " " +
      localStorage.getItem("psnUserLastName") );

      
  const [userEmail] = useState(localStorage.getItem("psnUserEmail"));
  const [userID] = useState(localStorage.getItem("psnUserId"));


  

  return (
    <div>
      {/* <h1>PostCompose component</h1> */}
      <div className="fs-4 fw-bold">Name:- {userFullname}</div>
      <div className="fs-4 fw-bold">Email:- {userEmail}</div>
      <div className="fs-4 fw-bold">ID:- {userID}</div>

    </div>
  );
}

export default Details;
