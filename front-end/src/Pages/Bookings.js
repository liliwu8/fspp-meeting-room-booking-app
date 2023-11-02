import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsClock, BsFillBuildingFill } from 'react-icons/bs'
import './Bookings.css'

const API = process.env.REACT_APP_API_URL
function Bookings() {
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

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
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(bookings.length / itemsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div className='bookings'>
      {currentBookings &&
        currentBookings.map((booking) => (
          <Link to={`/bookings/${booking.booking_id}`}>
            <div key={booking.id} className='bookings__container'>
              <h3> {booking.meeting_name}</h3>
              <p>{booking.meeting_room_name}</p>
              <div className='bookings__startTime'>
                <BsClock />
                &nbsp;
                <span>{convertUtcToEst(booking.start_time)}</span>
              </div>
              <div className='bookings__endTime'>
                <BsClock />
                &nbsp;
                <span>{convertUtcToEst(booking.end_time)}</span>
              </div>
              <div className='bookings__floor'>
                <BsFillBuildingFill /> <span>{booking.meeting_floor}</span>
              </div>
            </div>
          </Link>
        ))}

      <div className='pagination'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>{' '}
        <span className='current-page'>{currentPage}</span>{' '}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Bookings
