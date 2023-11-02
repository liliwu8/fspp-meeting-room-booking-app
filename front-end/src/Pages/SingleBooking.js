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
  function convertUtcToEst(utcTimestamp) {
    if (!utcTimestamp) {
      return 'Invalid Date'
    }
    const utcDate = new Date(utcTimestamp)
    if (isNaN(utcDate)) {
      return 'Invalid Date'
    }
    const estDate = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000)

    if (isNaN(estDate)) {
      return 'Invalid Date'
    }
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
    booking && (
      <div className='bookingInfo'>
        <div className='bookingInfo__container'>
          <h3>{booking.meeting_name}</h3>
          <div>
            <BsClock />
            <span>{convertUtcToEst(booking.start_time)}</span>
          </div>
          <div>
            <BsClock />
            <span>{convertUtcToEst(booking.end_time)}</span>
          </div>
          <div>
            <BsFillBuildingFill /> <span>{booking.meeting_floor}</span>
          </div>
          <button onClick={handleDelete}>Cancel</button>
        </div>
      </div>
    )
  )
}
export default SingleBooking
