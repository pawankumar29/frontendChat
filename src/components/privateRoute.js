


import React, { useEffect, useState } from "react";
import Login from "./login";
import axios from "axios";

const PrivateRoute = (props) => {
  //  const token = localStorage.getItem("token");
   const [token , setToken ] = useState(localStorage.getItem('token'))
  const { Component } = props;
  const [userData, setUserData] = useState(null);

  const headers={
    token:localStorage.getItem('token')
 }
  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:5166/v1/decodeToken", { token },{headers})
        .then((response) => {
          const data = response.data;
          if (data.status === 1) {
            setUserData(data.data);
            // Store userData in localStorage here

            console.log("userDataInPrivateRoute===>",data.data)
              localStorage.removeItem("userData");
            localStorage.setItem("userData", JSON.stringify(data.data));
          } else {
            console.error("Token is invalid:", data.Error);
          }
        })
        .catch((error) => {
          console.error("API call error:", error);
        });
    }
  }, []);

  const userData1 = localStorage.getItem("userData");

  // Check if userData is available and parse it
  const data = JSON.parse(userData1);

  // Access the email property
  const email = data?.data.email;

  console.log("Email:", email);

  return token ? <Component /> : <Login  onSuccess={(token)=>{setToken(token)}}/>;
};

export default PrivateRoute;
