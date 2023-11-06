import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EditBookingForm.css'
import { setHours, setMinutes, isAfter, isBefore } from 'date-fns'
import DatePicker from 'react-datepicker'
const API = process.env.REACT_APP_API_URL

const EditBookingForm = ({
  bookingId,
  bookingEndTime,
  bookingStartTime,
  onClose,
  onUpdate,
  booking,
}) => {
  const [editedBooking, setEditedBooking] = useState({
    start_time: new Date(bookingStartTime),
    end_time: new Date(bookingEndTime),
    meeting_name: booking.meeting_name,
    attendees: booking.attendees,
  })

  let navigate = useNavigate()

  const convertEstToUtc = (estTimestamp) => {
    const estDate = new Date(estTimestamp)
    const utcDate = new Date(estDate.getTime() + 5 * 60 * 60 * 1000)
    return utcDate.toISOString()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const startEST = editedBooking.start_time
    const endEST = editedBooking.end_time

    const startUTC = convertEstToUtc(startEST)
    const endUTC = convertEstToUtc(endEST)

    const singleBooking = {
      meeting_name: editedBooking.meeting_name,
      start_time: startUTC, // Use the UTC time
      end_time: endUTC, // Use the UTC time
      attendees: editedBooking.attendees,
    }
    axios
      .put(`${API}/bookings/${bookingId}`, singleBooking)
      .then((response) => {
        onUpdate(response.data.payload)
        window.location.reload()
        navigate(`/bookings/${bookingId}`)
      })
      .catch((error) => console.log(error))
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setEditedBooking({ ...editedBooking, [id]: value })
  }

  const handleStartTimeChange = (date) => {
    setEditedBooking({ ...editedBooking, start_time: date })
  }

  const handleEndTimeChange = (date) => {
    setEditedBooking({ ...editedBooking, end_time: date })
  }

  const customTimePicker = (date) => {
    const nineAm = setHours(setMinutes(date, 0), 9)
    const sixPm = setHours(setMinutes(date, 0), 18)

    return isAfter(date, nineAm) && isBefore(date, sixPm)
  }

  return (
    booking && (
      <div className='editBookingForm'>
        <div className='editBookingForm__container'>
          <div className='editBookingForm__innerContainer'>
            <h3>Edit Booking</h3>
            <form onSubmit={handleFormSubmit}>
              <div className='editBookingForm__row'>
                <div className='editBookingForm__col'>
                  <label className='editBookingForm__label'>Start:</label>
                  <DatePicker
                    className='editBookingForm__startTime'
                    selected={editedBooking.start_time}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='MM/dd/yyyy h:mm aa'
                    filterTime={customTimePicker}
                    minDate={new Date()}
                  />
                </div>
                <div className='editBookingForm__col'>
                  <label className='editBookingForm__label'>End</label>
                  <DatePicker
                    className='editBookingForm__endTime'
                    selected={editedBooking.end_time}
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='MM/dd/yyyy h:mm aa'
                    filterTime={customTimePicker}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className='editBookingForm__row'>
                <div className='editBookingForm__col'>
                  <label className='editBookingForm__label'>
                    Meeting Name:
                  </label>
                  <input
                    className='editBookingForm__meetingName'
                    type='text'
                    id='meeting_name'
                    value={editedBooking.meeting_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='editBookingForm__col'>
                  <label className='editBookingForm__label'>Attendees</label>
                  <input
                    className='editBookingForm__attendees'
                    type='text'
                    id='attendees'
                    value={editedBooking.attendees}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <button type='submit' className='saveButton'>Save</button>
                <button onClick={onClose}className='cancelButton'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default EditBookingForm
