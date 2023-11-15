
import React, { useEffect, useState } from "react";
import axios from "axios";
import Style from  "../style/friend.module.css"
import Pagination from "./pagination";
import { useNavigate } from "react-router-dom";
import Logout from "./logout";

function FriendFunction() {

    const navigate=useNavigate();

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage);
      };

      const [pageCount, setPageCount] = useState(0);
      const [offset, setOffset] = useState(0);
      const [perPage] = useState(2);


      useEffect(() => {
        getFriendDetail();
      }, [offset]);



      //-------------------------------------------------------
    const [friend, setFriend] = useState("");
    const [email, setEmail] = useState("");
    const [error,setError]=useState("");
   const[detail,setdetail]=useState(0);
   const[newFriend,setNewFriend]=useState("");
   const[fDetail,setFDetail]=useState("");

    const [sleepEntries,setSleepEntries]=useState([{
        id:"",
        wake_up_time:"",
        sleep_time:"",
        total_time:''
    }])


    const addFriend = async (e) => {
        try {
            e.preventDefault();
            const data = {
                friend_email: friend
            }

            // making the element diappearing
            if(newFriend!=="")setNewFriend("")
            console.log(data);
            axios.post(`http://localhost:5166/v1/addFriend`, data, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if(response.data.status)
                    console.log("add===>", response);
                else{  
                    setError(response.data.Error);
                    throw {message:response.data.Error}

                }


                })
                .catch((error) => {
                    console.error('Error adding sleep entry', error);
                });

        } catch (error) {
console.log("error:::",error);
        }


    }

    const getFriendDetail = async (e) => {
        try {
             //e.preventDefault();
            setError("");
            const data = {
                friend_email: email
            }



            console.log("sjdksdjkfjdsjfkj===>",data);
            axios.post(`http://localhost:5166/v1/getFriendRecord/${offset}`, data, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log("add===>", response.data);
                    // setSleepEntries(response.data.data)

                    const data = response?.data?.data;
                    console.log("dataInPage===>", response);
                    console.log("dataFromBackend===>", data);
                    if(data){
                        setdetail(1);
                    setSleepEntries(data.rows)}
                    setPageCount(Math.ceil(data?.count / perPage));

                })
                .catch((error) => {
                    console.error('Error adding sleep entry', error);
                });

        } catch (error) {
console.log("error:::",error);
        }


    }

    const getFriendDetail1 = async (e) => {
        try {
             e.preventDefault();
            setError("");
            const data = {
                friend_email: email
            }

            if(fDetail!=="")setFDetail("")

            console.log("sjdksdjkfjdsjfkj===>",data);
            axios.post(`http://localhost:5166/v1/getFriendRecord/${offset}`, data, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log("add===>", response.data);
                    // setSleepEntries(response.data.data)
                    setdetail(1)

                    const data = response?.data?.data;
                    console.log("dataInPage===>", response);
                    console.log("dataFromBackend===>", data);
                    if(data)
                    setSleepEntries(data.rows)
                    setPageCount(Math.ceil(data?.count / perPage));

                })
                .catch((error) => {
                    console.error('Error adding sleep entry', error);
                });

        } catch (error) {
console.log("error:::",error);
        }


    }




    return (
        <div className={Style.container}>

<button className={Style.button1} onClick={()=>{
  navigate('/chat')
}}>chat</button>
<div className={Style.button2} onClick={()=>{
  navigate('/login')
}}><Logout/></div>
        <form>
            <table>
                <tr>
                    <td>Add Friend:</td>
                    <td><input type="text" placeholder="add friend" value={newFriend} onChange={(e) => {
                        setNewFriend(e.target.value)
                        setFriend(e.target.value)
                    }} /></td>
                    <td><button onClick={(e)=>addFriend(e)} >Add Friend</button></td>
                </tr>
                <tr>
                    <td> Friend Email :</td>
                    <td><input type="text" placeholder="Enter friend Email" value={fDetail} onChange={(e) => {
                        setFDetail(e.target.value)
                        setEmail(e.target.value)
                    }} /></td>
                    <td><button onClick={(e)=>{
                        getFriendDetail1(e);
                    }}>Show Details</button></td>

                </tr>
            </table>
            <div className={Style.data}>
                {console.log("detail===>",detail)}
         {  sleepEntries[0].id?
                sleepEntries &&  
               sleepEntries.map((e)=>{
                   
                   return <ul>

                    <li>Id:{e.id}</li>
                    <li>sleep_time:{e.sleep_time}</li>
                    <li>wake_up_time:{e.wake_up_time}</li>
                    <li>total_time:{e.total_time}</li>


                    </ul>


               } ):""
            }
            </div>
        </form>
           <div className={Style.Error}>{error?error:""}</div> 


           <div className={Style.page}><Pagination handlePageClick={handlePageClick} pageCount={pageCount} /></div>

</div>

    )

}


export default FriendFunction;