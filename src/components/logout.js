import React from 'react';
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate = useNavigate();

    const style={
        margin:0,
        padding:0,
        width:'130px',
        backgroundColor:'red',
        color:'white',
        borderRadius:'130px'
     
    }

  const handleLogout = () => {
   

    localStorage.removeItem("token"); 
    localStorage.removeItem("userData"); 

    console.log("inside Logout");
    navigate('/login'); 
  };

  return (
    <div>
      <button style={style} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
