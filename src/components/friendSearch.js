
import React, { useState } from "react";
import axios from "axios";
import Style from  "../style/friend.module.css"
import Pagination from "./pagination";
function FriendFunction() {

    const [friend, setFriend] = useState("");
    const [email, setEmail] = useState("");
  const[detail,setdetail]=useState(0)
    const [sleepEntries,setSleepEntries]=useState([{
        id:"",
        wake_up_time:"",
        sleep_time:"",
        total_time:''
    }])


    const api_url='http://localhost:5166/v1/getFriendRecord';
    const addFriend = async (e) => {
        try {
            e.preventDefault();
            const data = {
                friend_email: friend
            }
            console.log(data);
            axios.post(`http://localhost:5166/v1/addFriend`, data, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log("add===>", response.data.data);


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
            e.preventDefault();
            const data = {
                friend_email: email
            }
            console.log(data);
            axios.post(`http://localhost:5166/v1/getFriendRecord`, data, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log("add===>", response.data);
                    setSleepEntries(response.data.data)
                    setdetail(1)

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

        <form>
            <table>
                <tr>
                    <td>Add Friend:</td>
                    <td><input type="text" placeholder="add friend" onChange={(e) => {
                        setFriend(e.target.value)
                    }} /></td>
                    <td><button onClick={(e)=>addFriend(e)} >Add Friend</button></td>
                </tr>
                <tr>
                    <td> Friend Email :</td>
                    <td><input type="text" placeholder="Enter friend Email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} /></td>
                    <td><button onClick={(e)=>{
                        getFriendDetail(e);
                    }}>Show Details</button></td>

                </tr>
            </table>
            <div className={Style.data}>
           { detail?
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



        <Pagination api_url={api_url}/>

</div>

    )











}


export default FriendFunction;