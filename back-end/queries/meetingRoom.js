//import the db object
const db = require('../db/dbConfig.js')

//get all users info from the database
const getAllMeetingRooms = async () => {
  try {
    const allMeetingRooms = await db.any('SELECT * FROM meetingRoom')
    return allMeetingRooms
  } catch (error) {
    console.log(error.message)
  }
}

const getMeetingRoom = async (id) => {
  try {
    const meetingRoom = await db.any(
      'SELECT * FROM meetingRoom WHERE id=$1',
     [ id]
    )
    return(meetingRoom)
  
  } catch (error) {
    console.log(error.message || error)
  }
}

const createMeetingRoom = async (meetingRoom) => {
  const { room_name, capacity, floor } = meetingRoom

  try {
    const addMeetingRoom = await db.one(
      'insert into meetingRoom (room_name, capacity, floor) values($1,$2,$3) returning *',
      [room_name, capacity, floor]
    )

    return addMeetingRoom
  } catch (error) {
    console.log(error.message || error)
  }
}

const getAllFutureBookingsForRoom = async (meetingRoomId) => {

  try {

    // Get future bookings for the meeting
    const futureBookings = await db.any(
      'SELECT * FROM booking WHERE book_meeting_roomid = $1 AND start_time > NOW()',
      [meetingRoomId]
    );

   return futureBookings
  } catch (error) {
    console.log(error.message || error)
 
  }
}

module.exports = {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  getAllFutureBookingsForRoom
}
 