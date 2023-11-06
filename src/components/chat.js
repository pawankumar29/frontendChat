import io from "socket.io-client";
import { useEffect, useState } from "react";
import style from "../style/chat.module.css";
const socket = io.connect("http://localhost:5166");

function Chat() {
  // Room State
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");
  const [receiver, setReceiver] = useState("");


  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { email, room });
    }
    // Manually clear the input fields
    document.getElementById("emailInput").value = "";
    document.getElementById("roomInput").value = "";
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room,from:email,to:receiver });
    // Manually clear the message input field
    document.getElementById("messageInput").value = "";
    document.getElementById("toInput").value = "";

  };

  useEffect(() => {
    socket.on("receive_message", (data) => {

      setMessageReceived(data.message);
      console.log("messageReceived==>",data.message);
    });
  }, [socket]);

  return (
    <div className={style.App}>
      <input
        placeholder="Email..."
        id="emailInput"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
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
      {messageReceived}
    </div>
  );
}

export default Chat;


// do not move like andha 
//