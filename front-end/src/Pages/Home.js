import { Link } from 'react-router-dom'
import './Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes, isAfter, isBefore } from 'date-fns'
import { BsFillPeopleFill, BsBuildingFill } from 'react-icons/bs'
import banner from './banner.jpg'

const API = process.env.REACT_APP_API_URL

function Home() {
  const [meetingRooms, setMeetingRooms] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [floor, setFloor] = useState('')
  const [capacity, setCapacity] = useState('')

  useEffect(() => {
    axios
      .get(`${API}/meeting-rooms`)
      .then((response) => {
        setMeetingRooms(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }, [])

  const customTimePicker = (date) => {
    const nineAm = setHours(setMinutes(date, 0), 9)
    const sixPm = setHours(setMinutes(date, 0), 18)

    return isAfter(date, nineAm) && isBefore(date, sixPm)
  }

  const filterEndTime = (date) => {
    const start = startDate
    return customTimePicker(date) && (start ? isAfter(date, start) : true)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    if (!endDate || isBefore(endDate, date)) {
      setEndDate(null) // Reset end time if it's before the new start time
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios
      .get(`${API}/bookings/meeting-rooms/available`, {
        params: {
          start_time: startDate,
          end_time: endDate,
          floor: floor,
          capacity: capacity,
        },
      })
      .then((response) => {
        setMeetingRooms(response.data.payload)
      })
      .catch((error) => console.error('catch', error))
  }

  return (
    <div>
      <div className='home__bannerSection'>
        <img src={banner} className='home__bannerImg' alt='pic' />
        {/* <section className='home__headerText'>
          <h1 className='home__title'>Book a Room</h1>
        </section> */}
      </div>
      {/* <div>three parts about office booking</div> */}
      <div className='searchAvailForm'>
        <div className='searchAvailableRoomForm'>
          <div className='searchAvailableRoomForm__container'>
            <div className='searchAvailableRoomForm__innerContainer'>
              <h2>Find available rooms:</h2>
              <form onSubmit={handleSubmit}>
                <div className='searchAvailableRoomForm__row'>
                  <div className='searchAvailableRoomForm__col'>
                    <label
                      className='searchAvailableRoomForm__roomLabel'
                      htmlFor='start'
                    >
                      Start:
                    </label>
                    <br />
                    <DatePicker
                      className='searchAvailableRoomForm__startTime'
                      selected={startDate}
                      onChange={handleStartDateChange}
                      showTimeSelect
                      timeIntervals={15}
                      timeCaption='Time'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      filterTime={customTimePicker}
                      minTime={setHours(setMinutes(new Date(), 0), 9)}
                      maxTime={setHours(setMinutes(new Date(), 0), 18)}
                    />
                  </div>

                  <div className='searchAvailableRoomForm__col'>
                    <label
                      htmlFor='end'
                      className='searchAvailableRoomForm__roomLabel'
                    >
                      End:
                    </label>
                    <br />
                    <DatePicker
                      className='searchAvailableRoomForm__endTime'
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      timeIntervals={15}
                      timeCaption='Time'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      filterTime={filterEndTime}
                      minTime={setHours(setMinutes(new Date(), 0), 9)}
                      maxTime={setHours(setMinutes(new Date(), 0), 18)}
                      disabled={!startDate}
                    />
                  </div>
                </div>
                <div className='searchAvailableRoomForm__row'>
                  <div className='searchAvailableRoomForm__col'>
                    <label
                      className='searchAvailableRoomForm__roomLabel'
                      htmlFor='floor'
                    >
                      Floor:
                    </label>
                    <br />
                    <input
                      className='searchAvailableRoomForm__roomFloor'
                      type='number'
                      id='floor'
                      name='floor'
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </div>
                  <div className='searchAvailableRoomForm__col'>
                    <label
                      className='searchAvailableRoomForm__roomLabel'
                      htmlFor='capacity'
                    >
                      Capacity:
                    </label>
                    <br />
                    <input
                      className='searchAvailableRoomForm__roomCapacity'
                      type='number'
                      id='capacity'
                      name='capacity'
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>
                <div className='searchAvailableRoomForm__row'>
                  <button type='submit'>Find</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='roomList'>
          {meetingRooms.length
            ? meetingRooms.map((room, index) => (
                <Link to={`/meetingrooms/${room.id}`} key={index}>
                  <div className='roomList__container'>
                    <h3>{room.room_name}</h3>
                    <p>
                      <BsFillPeopleFill /> {'  '}
                      {room.capacity}
                    </p>
                    <p>
                      <BsBuildingFill />
                      {'  '}
                      {room.floor}
                    </p>
                  </div>
                </Link>
              ))
            : 'No rooms'}
        </div>
      </div>
    </div>
  )
}

export default Home
