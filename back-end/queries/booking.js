//import the db object
const db = require("../db/dbConfig.js");


//get all bookings
const getAllBookings = async () => {
    try {
      const allBookings = await db.any("SELECT b.id AS booking_id, b.meeting_name,b.start_time, b.end_time, m.room_name AS meeting_room_name, m.floor AS meeting_floor FROM booking AS b JOIN meetingRoom AS m ON b.book_meeting_roomid = m.id");
      return allBookings;
    } catch (error) {
      console.log(error.message);
    }
};
  
const getBooking = async (id) => {
    try {
 const booking = await db.any("SELECT b.id AS booking_id,b.meeting_name, b.start_time, b.end_time, m.room_name AS meeting_room_name,m.floor AS meeting_floor FROM booking AS b JOIN meetingRoom AS m ON b.book_meeting_roomid = m.id WHERE b.id = $1", id);
      return booking;
    } catch (error) {
      console.log(error.message);
    }
};
  
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
   

  
const createBooking = async (booking) => {
    const { meeting_name, start_time, end_time, attendees, book_meeting_roomid } = booking;
  
    try {
      // Check if the room is available
      const roomAvailability = await db.oneOrNone(
        'SELECT * FROM booking ' +
        'WHERE book_meeting_roomid = $1 ' +
        'AND (($2, $3) OVERLAPS (start_time, end_time) ' +
        'OR ($4 >= start_time AND $4 < end_time) ' +
        'OR ($5 > start_time AND $5 <= end_time))',
        [book_meeting_roomid, start_time, end_time, start_time, end_time]
      );
  
      if (roomAvailability) {
        // Room is not available
        console.log("The room is not available for the specified time range.");
        return null;
      }
  
      // If the room is available, insert the booking
      const addBooking = await db.one(
        'INSERT INTO booking (meeting_name, start_time, end_time, attendees, book_meeting_roomid) ' +
        'VALUES ($1, $2, $3, $4, $5) ' +
        'RETURNING *',
        [meeting_name, start_time, end_time, attendees, book_meeting_roomid]
      );
  
      return addBooking;
    } catch (error) {
      console.log(error.message || error);
      return null;
    }
  };
  

module.exports= {getAllBookings, getBooking, createBooking,deleteBooking}



