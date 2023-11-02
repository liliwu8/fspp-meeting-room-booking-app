import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import './SingleMeetingRoom.css'
import { BsFillPeopleFill, BsBuildingFill, BsClockFill } from 'react-icons/bs'

const API = process.env.REACT_APP_API_URL

function SingleMeetingRoom() {
  const { id } = useParams()
  const [meetingRoom, setMeetingRoom] = useState([])
  const [futureBookings, setFutureBookings] = useState([])
  const selectedStartTime = localStorage.getItem('selectedStartTime')
  const selectedEndTime = localStorage.getItem('selectedEndTime')
  const [booking, setBooking] = useState({
    meeting_name: '',
    start_time: !selectedStartTime ? '' : new Date(selectedStartTime),
    end_time: !selectedEndTime ? '' : new Date(selectedEndTime),
    attendees: '',
    book_meeting_roomid: id,
  })

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

  const handleTextChange = (event) => {
    setBooking({
      ...booking,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
   
    const startUTC = booking.start_time.toISOString()
    const endUTC = booking.end_time.toISOString()
    const singleBooking = {
      meeting_name: booking.meeting_name,
      start_time: startUTC,
      end_time: endUTC,
      attendees:booking.attendees,
     book_meeting_roomid:  booking.book_meeting_roomid,
    }
    if (booking.start_time >= booking.end_time) {
      errorNotify('Start time should be before end time.')
    } else {
      axios
        .post(`${API}/bookings`, singleBooking)
        .then((response) => {
          console.log(response)
          notify()
          localStorage.clear()
        })
        .catch((err) => {
          errorNotify('Error while booking a meeting room.')
          console.warn(err)
        })
    }
  }

  const notify = () => {
    toast.success('You have successfully booked a meeting room', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
    setTimeout(() => {}, 3100)
  }

  const errorNotify = (message) => {
    toast.error(message, {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
    })
  }

  const convertUtcToEst = (utcTimestamp) => {
    const utcDate = new Date(utcTimestamp);
    const estDate = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000);
    const estDateFormat = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return estDateFormat.format(estDate);
  };

  // function convertToUTCString(date) {
  //   const isoString = date.toISOString()
  //   const formattedString = isoString.replace('T', ' ').split('.')[0]
  //   return `${formattedString} UTC`
  // }

  const customTimePicker = (date) => {
    const nineAm = setHours(setMinutes(new Date(), 0), 9)
    const sixPm = setHours(setMinutes(new Date(), 0), 18)

    return date >= nineAm && date <= sixPm
  }

  return (
    meetingRoom && (
      <div className='singleMeetingRoom'>
        <div className='singleMeetingRoom__container'>
          <div className='singleMeetingRoom__info'>
            <h3>{meetingRoom.room_name}</h3>
            <div className='singleMeetingRoom__capacity'>
              <BsFillPeopleFill size={20} /> <span>{meetingRoom.capacity}</span>
            </div>
            <div>
              <BsBuildingFill /> <span>{meetingRoom.floor}</span>
            </div>
          </div>
          <div className='bookMeetingRoomForm'>
            <div className='bookMeetingRoomForm__container'>
              <div className='bookMeetingRoomForm__innerContainer'>
                <h3>Book Room:</h3>
                <form onSubmit={handleSubmit}>
                  <div className='bookMeetingRoomForm__row'>
                    <div className='bookMeetingRoomForm__col'>
                      <label className='bookMeetingRoomForm__label'>
                        Meeting Name:
                      </label>
                      <input
                        className='bookMeetingRoomForm__meetingRoom'
                        name='meeting_name'
                        value={booking.meeting_name}
                        type='text'
                        id='meeting_name'
                        onChange={handleTextChange}
                        required
                      />
                    </div>
                    <div className='bookMeetingRoomForm__col'>
                      <label className='bookMeetingRoomForm__label'>
                        Attendees:
                      </label>
                      <input
                        className='bookMeetingRoomForm__attendees'
                        type='text'
                        value={booking.attendees}
                        name='attendees'
                        id='attendees'
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>
                  <div className='bookMeetingRoomForm__row'>
                    <div className='bookMeetingRoomForm__col'>
                      <label
                        htmlFor='start'
                        className='bookMeetingRoomForm__label'
                      >
                        Start:
                      </label>
                      <br />
                      <DatePicker
                        id='start_time'
                        className='bookMeetingRoomForm__startTime'
                        selected={booking.start_time}
                        onChange={(date) =>
                          setBooking((prevState) => ({
                            ...prevState,
                            start_time: date,
                          }))
                        }
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption='Time'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        filterTime={customTimePicker}
                        minDate={new Date()} // Allow dates starting from today
                        required
                      />
                    </div>
                    <div className='bookMeetingRoomForm__col'>
                      <label
                        className='bookMeetingRoomForm__label'
                        htmlFor='end'
                      >
                        End:
                      </label>
                      <br />
                      <DatePicker
                        id='end_time'
                        className='bookMeetingRoomForm__endTime'
                        selected={booking.end_time}
                        onChange={(date) =>
                          setBooking((prevState) => ({
                            ...prevState,
                            end_time: date,
                          }))
                        }
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption='Time'
                        dateFormat='MM/dd/yyyy h:mm aa'
                        filterTime={customTimePicker}
                        minDate={new Date()} // Allow dates starting from today
                        required
                      />
                    </div>
                  </div>
                  <div className='bookMeetingRoomForm__row'>
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!futureBookings.length ? (
            'This Room has no Future Bookings'
          ) : (
            <div className='singleBooking'>
              {futureBookings &&
                futureBookings.map((booking) => (
                  <Link to=''>
                    <div className='singleBooking__container'>
                      <h3>{booking.meeting_name}</h3>
                      <p>
                        <BsClockFill /> Start Time:
                        {convertUtcToEst(booking.start_time)}
                      </p>
                      <p>
                        <BsClockFill /> End Time:{' '}
                        {convertUtcToEst(booking.end_time)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    )
  )
}

export default SingleMeetingRoom
