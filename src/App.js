import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FriendFunction from './components/friendSearch';
import Signup from './components/signUp';
import Chat from './components/chat';
import PrivateRoute from './components/privateRoute';
import Logout from './components/logout';
import Sleep from './components/sleep';
import "./style/homepage.module.css";
import Login from './components/login';



function App() {
  return (
    <div>
    <Router>
        
        <Routes>
         <Route path="/friend" element={<PrivateRoute Component={FriendFunction}  />}/>
          {/* <Route path="/sleep" element={<SleepTracker/>}  />   */}
          <Route path="/sleep" element={<PrivateRoute Component={Sleep}  />}/>  
          <Route path="/login" element={<Login/>}  />  
          <Route path="/" element={<Signup/>}  />  
          <Route path="/chat" element={<PrivateRoute Component={Chat}  />}/>  
          {/* <Route path="/chat" element={<Chat/>}  />   */} 
        </Routes>
      {/* <button >Click</button> */}
    </Router>
    </div>

  );
}

export default App;



//task left
// 1.pagination in friend 
//2. chat mein remove from 
// 3.rendering issue 