import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './components/signUp';
import Login from './components/login';
import SleepTracker from './components/homepage';
import Chat from './components/chat';
import PrivateRoute from './components/privateRoute';
import Logout from './components/logout';
import Sleep from './components/sleep';



function App() {
  return (
    <div>
    <Router>
        
        <Routes>
         <Route path="/" element={<Signup/>}/>
         
          {/* <Route path="/sleep" element={<SleepTracker/>}  />   */}
          <Route path="/sleep" element={<PrivateRoute Component={Sleep}  />}/>  

          <Route path="/login" element={<Login/>}  />  

          {/* <Route path="/chat" element={<Chat/>}  />   */}
          <Route path="/chat" element={<PrivateRoute Component={Chat}  />}/>  

          {/* <Route path="/chat" element={<Chat/>}  />   */}

           
        </Routes>

      {/* <button >Click</button> */}

    </Router>
    </div>

  );
}

export default App;
