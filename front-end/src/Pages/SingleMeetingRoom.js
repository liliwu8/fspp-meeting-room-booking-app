import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL

function SingleMeetingRoom() {
  const { id } = useParams()

  const [meetingRoom, setMeetingRoom] = useState([])
  const [futureBookings, setFutureBookings] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms/${id}`)
      .then((response) => {
        setMeetingRoom(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [id])

  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms/${id}/bookings`)
      .then((response) => {
        setFutureBookings(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [id])

  function convertUtcToEst(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    
    // Create a new Date object adjusted for EST (UTC -5 hours)
    const estDate = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000);
  
    // Format the date in EST using the Intl.DateTimeFormat
    const estDateFormat = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
  
    return estDateFormat.format(estDate);
  }

  

  return (
    meetingRoom && (
      <div>
        <div>
          <h3>{meetingRoom.room_name}</h3>
          <p>capacity:{meetingRoom.capacity}</p>
          <p>Floor:{meetingRoom.floor}</p>
        </div>
        <div>
          <p>Book Room:</p>
          <label>Meeting Name:</label>
          <input name='' />

          <label htmlFor='start'>Start:</label>
          <input type='datetime-local' id='start' name='start' />
          <label htmlFor='end'>End:</label>
          <input type='datetime-local' id='end' name='end' step='900' />

          <label>Attendees:</label>
          <input name='' />
          <button>Submit</button>
        </div>
        <div>
          {!futureBookings.length ? (
            'This Room have no Future Bookings'
          ) : (
            <div >
              {futureBookings.map((booking) => (
                <div >
                  <h3>{booking.meeting_name}</h3>
                  <p>start time:{convertUtcToEst(booking.start_time)}</p>
                  <p>end time: {convertUtcToEst(booking.end_time)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default SingleMeetingRoom
