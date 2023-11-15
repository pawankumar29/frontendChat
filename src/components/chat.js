import io from "socket.io-client";
import { useEffect, useState } from "react";
import style from "../style/chat.module.css";
import axios from "axios"
import ShowMessage from "./showMessageComponent";
import Pagination from "./pagination";

const socket = io.connect("http://10.10.1.126:5166");

function Chat() {
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData);
  console.log("userDataIn==>", data);
  const id = data?.data.id;
  // Room State
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");
  const [receiver, setReceiver] = useState("");
  const [chats, setChats] = useState([
    {
      from: "",
      to: "",
      message: "",
      id: "",
      roomId: "",
      id:""
    },
  ]);

  console.log("chat:::",chats);

  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [joined, setJoin] = useState(false);
  const [msgSent, setMsgSent] = useState(false);




  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log("offset::",e);

    setOffset(selectedPage+1);
    console.log("offset::",offset);
  };


  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      let data=localStorage.getItem("userData");
      data = JSON.parse(data);
  
      console.log("localData===>",data?.data?.email)
      setEmail(data?.data?.email)

      socket.emit("join_room", { email:data?.data?.email, room });
    }
     if(!joined)
     setJoin(false);
    else
    setJoin(true);

    // let data=localStorage.getItem("userData");
    // data = JSON.parse(data);

    // console.log("localData===>",data?.data?.email)
    // Manually clear the input fields
    // document.getElementById("emailInput").value = "";
     document.getElementById("roomInput").value = "";

  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room,from:email,to:receiver });
    // Manually clear the message input field
    
    document.getElementById("messageInput").value = "";
    document.getElementById("toInput").value = "";
    setTimeout(() => {
      
    showMessage()
    }, 400);
    setOffset(offset);
    if(!msgSent)
    setMsgSent(false)
   else
   setMsgSent(true)
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
        //  showMessage();
      setMessageReceived(data.message);
      console.log("messageReceived==>",data.message);
    });
  }, [socket]);

  // while sending message 

  useEffect(() => {
    console.log("inside Joined ")
    showMessage();
  }, [joined]);

  useEffect(() => {
    console.log("inside msgsent");
    showMessage();
  }, [msgSent]);


  const showMessage=async()=>{
    
      try {
 
        const data={
            from:parseInt(id),
            to:parseInt(id)
        }
        console.log("offsetFromFrontend===>",`http://localhost:5166/v1/showMessage/${offset}`);


        axios.post(`http://10.10.1.126:5166/v1/showMessage/${offset}`, data,{
          headers: {
              token: localStorage.getItem('token')
          }
      }).then((response)=>{
        console.log("responseKkK===>",response);
            setChats(response.data.data.rows);
            const data=response?.data?.data;
             setPageCount(Math.ceil(data?.count / perPage));


      }).catch((error)=>{
        console.log("errorInReq==>",error.message);
      })
        
      } catch (error) {
        console.log("error==>",error.message);

      }
      
 
  }

  useEffect(()=>{
      try {

        const data={
            from:parseInt(id),
            to:parseInt(id)
        }
        axios.post(`http://10.10.1.126:5166/v1/showMessage/${offset}`, data,{
          headers: {
              token: localStorage.getItem('token')
          }
      }).then((response)=>{
        console.log("response===>",response);
        response.data.data.rows? setChats(response.data.data.rows):setChats("");
            const data=response?.data?.data;
             setPageCount(Math.ceil(data?.count / perPage));


      }).catch((error)=>{
        console.log("errorInReq==>",error.message);
      })
        
      } catch (error) {
        console.log("error==>",error.message);

      }
  },[])

  useEffect(()=>{
    showMessage()
  },[offset])

  return (
    <div className={style.App}>
      {/* <input
        placeholder="Email..."
        id="emailInput"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br /> */}

<br />
<br />
<br />

      <input
        placeholder="Room Number..."
        id="roomInput"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <br />
      <input
        placeholder="TO..."
        id="toInput"
        onChange={(event) => {
          setReceiver(event.target.value);
        }}
      />
      <input
        placeholder="Message..."
        id="messageInput"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <br />

      <h1> Message:</h1>
         {chats&&
       
       chats.map((data)=>{
        if(data.from===id){
          
          data.check=true;
           return <ShowMessage data={data} />
        }
          else{

            data.check=false;
            return <ShowMessage data={data} />
          }

      })
       }  
             <div className={style.page}><Pagination handlePageClick={handlePageClick} pageCount={pageCount} /></div>

    </div>
  );
}

export default Chat;


// when a object changes its state it renders


