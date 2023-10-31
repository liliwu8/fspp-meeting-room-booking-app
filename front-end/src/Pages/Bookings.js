import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Bookings.css'
import SingleBooking from './SingleBooking'

const API = process.env.REACT_APP_API_URL
function Bookings() {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    axios
      .get(`${API}/bookings`)
      .then((response) => {
        setBookings(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [])

  function convertUtcToEst(utcTimestamp) {
    const utcDate = new Date(utcTimestamp)

    // Create a new Date object adjusted for EST (UTC -5 hours)
    const estDate = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000)

    // Format the date in EST using the Intl.DateTimeFormat
    const estDateFormat = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    return estDateFormat.format(estDate)
  }

  return (
    <div className='bookings'>
      {bookings.map((booking) => (
        <Link to={`/bookings/${booking.booking_id}`}>
          <div key={booking.id} className='bookings__container'>
            <h3> {booking.meeting_name}</h3>
            <p>{booking.meeting_room_name}</p>
            <p>{convertUtcToEst(booking.start_time)}</p>
            <p>{convertUtcToEst(booking.end_time)}</p>
            <p>{booking.meeting_floor}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Bookings
