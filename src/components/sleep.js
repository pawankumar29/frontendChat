
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import Style from "../style/sleep.module.css"
const Sleep = () => {
  // to get the user id
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData);
  console.log("userDataIn==>", data);
  const id = data?.data.id;


  function calculateTimeDifferenceInHours(startTime, endTime) {
    console.log(startTime + "::::" + endTime);
    // Split the time values into hours and minutes
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    // Calculate the total minutes for each time
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;

    // Calculate the time difference in minutes
    const timeDifferenceInMinutes = totalEndMinutes - totalStartMinutes;

    // Calculate the time difference in hours
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;

    return timeDifferenceInHours;
  }


  const headers = {
    token: localStorage.getItem('token')
  }
  // headers for the request 

  const [sleepEntries, setSleepEntries] = useState([{ id: "", sleepTime: "", wakeUpTime: "", totalSleepDuration: "" }]); // for displaying the data 


  const [isEdit, setEdit] = useState(0)  // only for changing the button 

  const [editId, setEditId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);



  const [newEntry, setNewEntry] = useState({
    date: '',
    sleepTime: '',
    wakeUpTime: '',
    totalSleepDuration: '',
  }); // will be used while setting up the data 




  //functions 
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



  // to add sleep entry
  const addSleepEntry = () => {

  try{
    const newEntryData = {
      userId: id,
      sleep_time: newEntry.sleepTime,
      wake_up_time: newEntry.wakeUpTime,
      total_time: parseInt(newEntry.totalSleepDuration),
    };
    console.log("newOne=====>", newEntryData);

    if (!isEdit) {
      axios.post('http://localhost:5166/v1/record', newEntryData, { headers }) // Adjust the API endpoint
        .then((response) => {
          // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
          console.log("rerer", response);
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
    }
    else {

      console.log("new===>", newEntryData);
      // console.log("entry",entryId);
      axios.post(`http://localhost:5166/v1/editRecord/${editId}`, newEntryData, { headers }) // Adjust the API endpoint
        .then((response) => {
          // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
          console.log("rerer", response);
          fetchSleepEntries();


        })
        .catch((error) => {
          console.error('Error adding sleep entry', error);
        });

      setEdit(0);


    }
  }
  catch(error){
     
  }
  };


//to delete sleep entry
const deleteSleepEntry = (entryId) => {
    
  console.log("entry",entryId);
  axios.delete(`http://localhost:5166/v1/deleteRecord/${entryId}`,{headers}) // Adjust the API endpoint
  .then((response) => {
    // Upon success, you can either update the sleepEntries from the response or fetch updated data from the server.
    console.log("rerer",response);
    setDeleteId(1);
    fetchSleepEntries();
           
  })
  .catch((error) => {
    console.error('Error adding sleep entry', error);
  });
  
};

  // to fetch all records 
  const fetchSleepEntries = () => {
    try {

      axios.get(`http://localhost:5166/v1/getRecord/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          console.log("add===>", response.data.data);
          setSleepEntries(response.data.data);


        })
        .catch((error) => {
          console.error('Error adding sleep entry', error);
        });
    } catch (error) {
      console.log("errorInfetchSleepEntries===>", error)
    }
  };

  function editStyle(id) {
    setEdit(1)
    setEditId(id);
  }



  useEffect(() => {
    //  fetchSleepEntries();
    <div><Pagination Comp={setSleepEntries} /></div>

  }, [])

  useEffect(() => {
    //  fetchSleepEntries();
    <div><Pagination Comp={setSleepEntries} /></div>

  }, [deleteId])


  console.log("sleep===>", sleepEntries);

  return (
    <div>

      <form>
        <h1>Sleep Tracker</h1>
        <div className={Style.setCol}>
          <span>Enter Sleep Time:</span>
          <input
            type="time"
            placeholder="Sleep Time"
            value={newEntry.sleepTime}
            onChange={(e) => setNewEntry({ ...newEntry, sleepTime: e.target.value })}
          />

        </div>


        <div className={Style.setCol}>
          <span>Enter wake up Time:</span>
          <input
            type="time"
            placeholder="Sleep Time"
            value={newEntry.wakeUpTime}
            onChange={(e) => {
              e.preventDefault()
              const time = eval(newEntry.sleepTime.slice(0, 2) - newEntry.wakeUpTime.slice(0, 2));
              const minute = eval(newEntry.sleepTime.slice(3, 5) - newEntry.wakeUpTime.slice(3, 5));
              const finalTime = calculateTimeDifferenceInHours(newEntry.sleepTime, e.target.value);

              setNewEntry({ ...newEntry, wakeUpTime: e.target.value, totalSleepDuration: finalTime })
            }}
          />

        </div>


        <div className={Style.setCol}>
          <span>TotalSleepDuration:</span>
          <input
            type="text"
            placeholder="sleep duration Time"
            value={newEntry.totalSleepDuration}
            onChange={(e) => {

              const time = eval(newEntry.sleepTime.slice(0, 2) - newEntry.wakeUpTime.slice(0, 2));
              console.log("time===>", time)
              setNewEntry({ ...newEntry, totalSleepDuration: time })
            }
            }
          />

        </div>


        {!isEdit ? <button style={{ marginLeft: '60px' }} onClick={addSleepEntry}>Add Entry</button> : <button style={{ marginLeft: '60px' }} onClick={addSleepEntry}>edit Entry</button>}

        {/* to fetch all the latest sleep entries */}
        {sleepEntries &&
          sleepEntries.map((e) => {
            return <ul className={Style.edit}>
              <li>id:{e.id}</li>
              <li>sleep_time:{e.sleep_time}</li>
              <li>wake_up_time:{e.wake_up_time}</li>
              <button style={{ marginLeft: '60px' }} onClick={(event) => {
                event.preventDefault()
                editStyle(e.id)
              }}>Edit</button>
              <button onClick={(event)=>{
                event.preventDefault();
                deleteSleepEntry(e.id)
              }}>Delete</button>

            </ul>

          })



        }


      </form>


      { /* if u do not write () in functional component then it will give the error of a lot of renders */}


      <div className={Style.page}><Pagination Comp={setSleepEntries} /></div>


    </div>






  )


















}


export default Sleep;