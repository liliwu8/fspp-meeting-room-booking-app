import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import './NewRoom.css' // Import your CSS file

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

    axios
      .post(`${API}/meeting-rooms`, newMeetingRoom)
      .then(() => {
        notify()
      })
      .catch((err) => {
        console.warn(err)
        errorNotify()
      })
  }
  const notify = () => {
    toast.success('You have successfully created a meeting room ', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {
      navigate('/')
    }, 3100)
  }

  const errorNotify = () => {
    toast.error('Sorry, there is an error creating a room', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className='new-room'>
      <div className='new-room-container'>
        <h3>Create a Room</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='roomName' className='form-label'>
              Room Name:
            </label>
            <input
              type='text'
              id='room_name'
              name='roomName'
              value={newMeetingRoom.room_name}
              onChange={handleTextChange}
              required
              className='form-input'
            />
          </div>
          <div>
            <label htmlFor='floor' className='form-label'>
              Floor:
            </label>
            <input
              type='text'
              id='floor'
              name='floor'
              value={newMeetingRoom.floor}
              onChange={handleTextChange}
              required
              className='form-input'
            />
          </div>
          <div>
            <label htmlFor='capacity' className='form-label'>
              Capacity:
            </label>
            <input
              type='number'
              id='capacity'
              name='capacity'
              value={newMeetingRoom.capacity}
              onChange={handleTextChange}
              required
              className='form-input'
            />
          </div>
          <div>
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default NewRoom
