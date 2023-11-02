import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import './SingleBooking.css'
import { BsClock, BsFillBuildingFill } from 'react-icons/bs'

const API = process.env.REACT_APP_API_URL

function SingleBooking() {
  const { id } = useParams()
  const [booking, setBooking] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API}/bookings/${id}`)
      .then((response) => {
        setBooking(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [id])

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure you want to cancel this booking?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // User if confirmed, proceed with deleting
            axios
              .delete(`${API}/bookings/${id}`)
              .then(() => {
                navigate('/bookings')
              })
              .catch((err) => {
                console.warn('Error deleting booking: ', err)
              })
          },
        },
        {
          label: 'No',
          onClick: () => {
            // if user clicked "No" or closed the dialog, does nothing
          },
        },
      ],
    })
  }

  return (
    booking && (
      <div className='bookingInfo'>
        <div className='bookingInfo__container'>
          <h3>{booking.meeting_name}</h3>
          <div>
            <BsClock />
            Start
            <span>{booking.start_time}</span>
          </div>
          <div>
            <BsClock />
            End
            {booking.end_time}
          </div>

          <p>
            <BsFillBuildingFill />
            {booking.meeting_floor}
          </p>
        </div>
        <button onClick={handleDelete}>Cancel</button>
      </div>
    )
  )
}
export default SingleBooking
