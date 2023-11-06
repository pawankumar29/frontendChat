
import React, { useState, useEffect } from 'react';
import axios from "axios";
import style from "../style/homepage.module.css";
import Logout from './logout';
import ReactPaginate from 'react-paginate';
import Pagination from './pagination';


const SleepTracker = () => {
  //to get the userId
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData);
console.log("userDataIn==>",data);
  const id=data?.data.id;


  // State to manage sleep entries
  const [sleepEntries, setSleepEntries] = useState([ {id:"",date:"",sleepTime:"",wakeUpTime:"",totalSleepDuration:""}]);

  const [newEntry, setNewEntry] = useState({
    date: '',
    sleepTime: '',
    wakeUpTime: '',
    totalSleepDuration: '',
  });
  const [newEditEntry, setNewEditEntry] = useState({
    date: '',
    sleepTime: '',
    wakeUpTime: '',
    totalSleepDuration: '',
  });
  const [expandedEntryId, setExpandedEntryId] = useState(null);

  const headers={
     token:localStorage.getItem('token')
  }

  const fetchSleepEntries = () => {
      try {
       
  axios.get(`http://localhost:5166/v1/getRecord/${id}`,{
     headers:{
    token:localStorage.getItem('token')
     }
  }) 
  .then((response) => {
    console.log("add===>",response.data.data);
    setSleepEntries(response.data.data);
    
  })
  .catch((error) => {
    console.error('Error adding sleep entry', error);
  });        
      } catch (error) {
        console.log("errorInfetchSleepEntries===>",error)
      }
  };


 

  const addSleepEntry = () => {
    const newEntryData = {
        userId: id,
        sleep_time: newEntry.sleepTime,
        wake_up_time: newEntry.wakeUpTime,
        total_time: newEntry.totalSleepDuration,
      };

      axios.post('http://localhost:5166/v1/record', newEntryData,{headers}) // Adjust the API endpoint
        .then((response) => {
          // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
          console.log("rerer",response);
          setSleepEntries([...sleepEntries, response.data]);
          setNewEntry({
            date: '',
            sleepTime: '',
            wakeUpTime: '',
            totalSleepDuration: '',
          });
        })
        .catch((error) => {
          console.error('Error adding sleep entry', error);
        });
  };

  // Function to delete a sleep entry
  const deleteSleepEntry = (entryId) => {
    
    console.log("entry",entryId);
    axios.delete(`http://localhost:5166/v1/deleteRecord/${entryId}`,{headers}) // Adjust the API endpoint
    .then((response) => {
      // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
      console.log("rerer",response);
      fetchSleepEntries();
      
    })
    .catch((error) => {
      console.error('Error adding sleep entry', error);
    });
    
  };

  // Function to edit a sleep entry
  const editSleepEntry = (entryId, updatedEntry) => {
    // Make an API request to update the entry in your database
    // Then, update the 'sleepEntries' state with the updated entry
    if (entryId === expandedEntryId) {
        const newEntryData = {
            userId: id,
            sleep_time: newEditEntry.sleepTime,
            wake_up_time: newEditEntry.wakeUpTime,
            total_time: newEditEntry.totalSleepDuration,
          };

          console.log("new===>",newEntryData);
          console.log("entry",entryId);
          axios.post(`http://localhost:5166/v1/editRecord/${entryId}`,newEntryData,{headers}) // Adjust the API endpoint
          .then((response) => {
            // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
            console.log("rerer",response);
            fetchSleepEntries();

            
          })
          .catch((error) => {
            console.error('Error adding sleep entry', error);
          });
          
      
        // If the div is already expanded, close it
        setExpandedEntryId(null);
      } else {      setSleepEntries()

        // Otherwise, expand the div for the clicked entry
        setExpandedEntryId(entryId);
      }
  };


  const chatLinkStyle={
    display:'flex',
    postion:'absolute',
    top:0,
    left:800,
    margin:0,
    padding:0,
    width:'130px',
    backgroundColor:'red',
    color:'white',
    borderRadius:'130px',
    marginRight:0,
    marginTop:0,
    
 
}
  

  // useEffect(() => {
  //   // Fetch sleep entries when the component mounts
  //   fetchSleepEntries();
  // }, []);

  

  useEffect(() => {
    axios.get(`http://localhost:5166/v1/getLatestRecord/${id}`,{headers}) // Adjust the API endpoint
    .then((response) => {
      // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
      console.log("rererSleep",response);
      const d=response.data.data[0];
      setNewEntry({id:d.id,date:d.date,sleepTime:d.sleep_time,wakeUpTime:d.wake_up_time,totalSleepDuration:d.total_time})

      
    })
    .catch((error) => {
      console.error('Error adding sleep entry', error);
    });  }, []);

  return (
    <div>
      <div style={{}}><Logout/></div>
      {/* <div style={chatLinkStyle}><a href='/chat'>Chat</a></div> */}
      {/* Form to add a new sleep entry */}
      <form>
      <h1>Sleep Tracker</h1>
      
        <input
          type="DATE"
          placeholder="Date"
          value={JSON.stringify(newEntry.date)}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
        />
     
        <input
          type="time"
          placeholder="Sleep Time"
          value={newEntry.sleepTime}
          onChange={(e) => setNewEntry({ ...newEntry, sleepTime: e.target.value })}
        />
        <input
          type="time"
          placeholder="Wake Up Time"
          value={newEntry.wakeUpTime}
          onChange={(e) => setNewEntry({ ...newEntry, wakeUpTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Total Sleep Duration (in hours)"
          value={newEntry.totalSleepDuration}
          onChange={(e) =>
            setNewEntry({ ...newEntry, totalSleepDuration: e.target.value })
          }
        />
        <button style={{marginLeft:'60px'}} onClick={addSleepEntry}>Add Entry</button>
      </form>

      {/* List of sleep entries */}  
      {console.log("sleep==>",sleepEntries)}                 
    {sleepEntries &&<ul>
        {sleepEntries.map((entry) => (
          <li key={entry.id}>
            {/* Display sleep entry details */}
           {expandedEntryId !== entry.id && <table >
                <tr>
                    <td>
            <div>user: {entry.userId}</div>
            <div>Sleep Time: {entry.sleep_time}</div>
            <div>Wake Up Time: {entry.wake_up_time}</div>
            <div>Total Sleep Duration: {entry.total_time} hours</div>
            </td>
            </tr>
            </table>
}

            {expandedEntryId === entry.id && (
              <div>
                <table>
                  <tr>
                 <td> <input
          type="date"
          placeholder="Date"
          value={newEditEntry.date}
          onChange={(e) => setNewEditEntry({ ...newEditEntry, date: e.target.value })}
        /></td>
        </tr>
        <tr>
       <td> <input
          type="time"
          placeholder="Sleep Time"
          value={newEditEntry.sleepTime}
          onChange={(e) => setNewEditEntry({ ...newEditEntry, sleepTime: e.target.value })}
        /></td>
        </tr>

        <tr>
       <td> <input
          type="time"
          placeholder="Wake Up Time"
          value={newEditEntry.wakeUpTime}
          onChange={(e) => setNewEditEntry({ ...newEditEntry, wakeUpTime: e.target.value })}
        />
        </td>
        </tr>

        <tr>
        <td>
        <input
          type="text"
          placeholder="Total Sleep Duration (in hours)"
          value={newEditEntry.totalSleepDuration}
          onChange={(e) =>
            setNewEditEntry({ ...newEditEntry, totalSleepDuration: e.target.value })
          }
        />
        </td>
                  </tr>
                </table>
              </div>
            )}

            {/* Edit and Delete buttons */}
            <button onClick={() => editSleepEntry(entry.id)}>Edit</button>
           
            <button onClick={() => deleteSleepEntry(entry.id)}>Delete</button>
          </li>
        ))}
    
      </ul>
}

<div><Pagination/></div>
    </div>
  );
};

export default SleepTracker;





// points to be noted 
// 1.pagination
// 2.auto filled 
// 3.encrypted password
// edit on the same 