import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
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
    axios
      .delete(`${API}/bookings/${id}`)
      .then(() => {
        navigate('/bookings');
      })
      .catch((err) => {
        console.warn('Error deleting booking: ', err);
      });
  };
  return (
    booking && (
      <div>
        <div>
          <h3>{booking.meeting_name}</h3>
          <p>start: {booking.start_time}</p>
          <p>end: {booking.end_time}</p>
          <p>floor:{booking.meeting_floor}</p>
        </div>
        <button onClick={handleDelete}>Cancel</button>
      </div>
    )
  )
}
export default SingleBooking
