import axios from 'axios';
import React, { useState,useEffect } from 'react';
import style from "../style/login.module.css"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Logout from './logout';

function Login({onSuccess}) {
  // localStorage.removeItem("token");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [token,setToken]=useState(null)
  const location = useLocation(); 
  console.log("url:::",location.pathname)  ;
  const url=location.pathname;
   const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        console.log("formData",formData)
    const result=await axios.post("http://localhost:5166/v1/Login",formData);

    setFormData({ 
    email: '',
    password: '',
    })

    if(result.data.status){
        localStorage.setItem("token",result.data.token);
        console.log("l",location.pathname);
        console.log("location==>",location.pathname!="/login");
        if(url.toLowerCase()!="/login"){
        onSuccess(result.data.token)
        }
        const token=localStorage.getItem("token");
        
        // setTokenParent(token)
      setToken(token);
        console.log("token====>",token);
        console.log("react-->",result.data.token);

        if(url.toLowerCase()=="/login"){
          setTimeout(()=>{
            navigate("/sleep");
          },1000)          }
          else
        setTimeout(()=>{
          navigate(location.pathname);
        },1000)
    }
    else{
      console.log("in login error ")
        localStorage.removeItem("token");

        console.log("react-->",result.data.Error);
 
    }

    }
  catch (error) {

        console.log("error>>==",error.message)
    }  };

  return (
    <div className={style.mainDiv}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <table>
            <tr>
                <td>Email:</td>
                <td>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /></td></tr>
        <br/>
         <tr>
         <td>Password:</td>

            <td>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        </td></tr>
        <br/>

        <tr><td colSpan="2"><button className={style.button} type="submit">Login</button></td></tr>

        </table>
      </form>
      <div style={{marginLeft:'100px'}}><Logout/></div>

    </div>
  );
}

export default Login;
