//import the db object
const db = require('../db/dbConfig.js')

//get all bookings
const getAllBookings = async () => {
  try {
    const allBookings = await db.any(
      'SELECT booking.id, booking.meeting_name, booking.start_time, booking.end_time, meetingRoom.room_name, meetingRoom.floor, booking.attendees FROM booking JOIN meetingRoom ON book_meeting_roomid = meetingRoom.id'
    )
    return allBookings
  } catch (error) {
    console.log(error.message)
  }
}

const getBooking = async (id) => {
  try {
    const booking = await db.any(
      'SELECT booking.id, booking.meeting_name, booking.start_time, booking.end_time, meetingRoom.room_name, meetingRoom.floor, booking.attendees FROM booking JOIN meetingRoom ON book_meeting_roomid = meetingRoom.id Where booking.id = $1',
      id
    )
    return booking
  } catch (error) {
    console.log(error.message || error)
  }
}

const deleteBooking = async (bookingId) => {
  try {
    const deleteBook = await db.one(
      'delete from booking where id=$1 returning *',
      bookingId
    )
    return deleteBook
  } catch (error) {
    console.log(error.message || error)
  }
}
//create a booking and looking for overlap time if there is you booking shouldnt be created
const createBooking = async (booking) => {
  const { meeting_name, start_time, end_time, attendees, book_meeting_roomid } =
    booking

  try {
    // Check if the room is available
    const roomAvailability = await db.oneOrNone(
      'SELECT * FROM booking ' +
        'WHERE book_meeting_roomid = $1 ' +
        'AND (($2, $3) OVERLAPS (start_time, end_time) ' +
        'OR ($4 >= start_time AND $4 < end_time) ' +
        'OR ($5 > start_time AND $5 <= end_time))',
      [book_meeting_roomid, start_time, end_time, start_time, end_time]
    )

    if (roomAvailability) {
      // Room is not available
      console.log('The room is not available for the specified time range.')
      return null
    }

    // If the room is available, insert the booking
    const addBooking = await db.one(
      'INSERT INTO booking (meeting_name, start_time, end_time, attendees, book_meeting_roomid) ' +
        'VALUES ($1, $2, $3, $4, $5) ' +
        'RETURNING *',
      [meeting_name, start_time, end_time, attendees, book_meeting_roomid]
    )

    return addBooking
  } catch (error) {
    console.log(error.message || error)
    return null
  }
}

const findAvailableMeetingRooms = async (
  startTime,
  endTime,
  capacity,
  floor
) => {
  try {
    let query = `
        SELECT meetingRoom.*
        FROM meetingRoom
        WHERE
          (meetingRoom.capacity >= $1 OR $1 IS NULL)
          AND (meetingRoom.floor = $2 OR $2 IS NULL)
          AND NOT EXISTS (
            SELECT 1
            FROM booking
            WHERE booking.book_meeting_roomid = meetingRoom.id
              AND ($3 <= booking.end_time AND $4 >= booking.start_time)
          )`

    // Create a new array for queryParams that takes into account optional parameters.
    const queryParams = []
    if (capacity !== undefined) {
      queryParams.push(capacity)
    } else {
      queryParams.push(null)
    }

    if (floor !== undefined) {
      queryParams.push(floor)
    } else {
      queryParams.push(null)
    }

    queryParams.push(startTime, endTime)

    const availableRooms = await db.any(query, queryParams)

    return availableRooms
  } catch (error) {
    console.error('Error in finding available meeting rooms:', error)
    throw error
  }
}

const updateBooking = async (id, booking) => {
  const { meeting_name, start_time, end_time, attendees } = booking

  try {
    // Check for overlapping bookings
    const overlappingBooking = await db.oneOrNone(
      'SELECT * FROM booking WHERE book_meeting_roomid = (SELECT book_meeting_roomid FROM booking WHERE id = $1) ' +
        'AND id != $1 ' +
        'AND ($2, $3) OVERLAPS (start_time, end_time)',
      [id, start_time, end_time]
    )

    if (overlappingBooking) {
      // Handle overlapping booking, you can throw an error or return an error message.
      return 'Booking overlaps with an existing booking.'
    }

    // Update the booking if no overlapping bookings were found
    const updateBooking = await db.one(
      'UPDATE booking SET meeting_name=$1, start_time=$2, end_time=$3 , attendees=$4 WHERE id = $5 RETURNING *',
      [meeting_name, start_time, end_time, attendees, id]
    )

    return updateBooking
  } catch (error) {
    console.log(error.message || error)
    return error
  }
}

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  findAvailableMeetingRooms,
  updateBooking,
}
