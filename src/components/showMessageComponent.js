
import React from "react";
import Style from "../style/showMessage.module.css";
function ShowMessage(props){

const {data}=props



console.log("messageInReact==>",data.message);
  return(
  <div>
    {Boolean(data.check)?
    <div className={Style .from}>
       {data.message}
    </div>:
<div className={Style .to}>
{data.message}?{data.message}:""
</div>

    }
</div>
    
  )
}


export default ShowMessage;