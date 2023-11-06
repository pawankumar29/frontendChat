import React, { useState } from 'react';
import style from "../style/signup.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age:''
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        console.log("formData",formData)
    const result=await axios.post("http://localhost:5166/v1/signUp",formData);
    setFormData({ name: '',
    email: '',
    password: '',
    age:''})

    setTimeout(()=>{
      navigate("/Login")
    },1000)

    }
  catch (error) {

        console.log("error>>==",error.message)
    }
    }  

  return (
    <div  className={style.mainDiv}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} >
        <div> 
      <table >

        <tr><td>Name:</td>
            <td><input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        /></td></tr>
        <br/>
         <tr><td>Email:</td><td><input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /></td></tr>
        <br/>

        <tr><td>Password:</td><td> <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /></td></tr>
                <br/>

                <tr><td>Age:</td><td> <input
          type="text"
          name="age"
          placeholder="age"
          value={formData.age}
          onChange={handleChange}
        /></td></tr>
                        <br/>


       <tr><td colSpan="2"><button className={style.button} type="submit">Sign Up</button></td></tr>

       <br/>
       <tr><td ><a className={style.anchor} type="submit" href="/Login">Login</a></td></tr>

        </table>
        </div>
      </form>

    </div>
  );
}

export default Signup;
