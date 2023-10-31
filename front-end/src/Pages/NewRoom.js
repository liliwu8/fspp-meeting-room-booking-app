import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = process.env.REACT_APP_API_URL

function NewRoom() {
  const [newMeetingRoom, setNewMeetingRoom] = useState({
    room_name: '',
    capacity: 0,
    floor: 0,
  })
  const navigate = useNavigate()

  const handleTextChange = (event) => {
    setNewMeetingRoom({
      ...newMeetingRoom,
      [event.target.id]: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    axios
      .post(`${API}/meeting-rooms`, newMeetingRoom)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='roomName'>Room Name:</label>
          <input
            type='text'
            id='room_name'
            name='roomName'
            value={newMeetingRoom.room_name}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor='floor'>Floor:</label>
          <input
            type='text'
            id='floor'
            name='floor'
            value={newMeetingRoom.floor}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <label htmlFor='capacity'>Capacity:</label>
          <input
            type='number'
            id='capacity'
            name='capacity'
            value={newMeetingRoom.capacity}
            onChange={handleTextChange}
            required
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default NewRoom
