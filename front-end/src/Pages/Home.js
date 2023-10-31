import { Link } from 'react-router-dom'
import './Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL
function Home() {
  
  const [meetingRooms, setMeetingRooms] = useState([])
  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms`)
      .then((response) => {
        setMeetingRooms(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [])

  return (
    <div>
      <div className='search-section'>
        <h2>Find available rooms:</h2>
        <div className='input-group'>
          <label htmlFor='start'>Start:</label>
          <input type='datetime-local' id='start' name='start' />
        </div>
        <div className='input-group'>
          <label htmlFor='end'>End:</label>
          <input type='datetime-local' id='end' name='end'  />
        </div>
        <div className='input-group'>
          <label htmlFor='floor'>Floor:</label>
          <input type='number' id='floor' name='floor' />
        </div>
        <div className='input-group'>
          <label htmlFor='capacity'>Capacity:</label>
          <input type='number' id='capacity' name='capacity' />
        </div>
        <button>Find</button>
      </div>
      <div className='roomList'>
        {meetingRooms.map((room,index) => (
          <Link to={`/meetingrooms/${room.id}`}>
            <div className='roomList__container' key={index}>
              <h3>Room Name: {room.room_name}</h3>
              <p> capacity:{room.capacity}</p>
              <p>floor:{room.floor}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
