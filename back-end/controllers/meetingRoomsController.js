//dependencies
const express = require('express')

//sub routes
const meetingRooms = express.Router()

const {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  getAllFutureBookingsForRoom,
} = require('../queries/meetingRoom')

//display all meeting rooms
meetingRooms.get('/', async (req, res) => {
  try {
    const allMeetingRooms = await getAllMeetingRooms()
    res.status(200).json({ success: true, payload: allMeetingRooms })
  } catch (error) {
    res.status(404).json({ sucesss: false, message: 'no meeting room found!' })
  }
})

meetingRooms.get('/:meetingroom_id', async (req, res) => {
  const { meetingroom_id } = req.params
  const meetingRoom = await getMeetingRoom(meetingroom_id)

  if (meetingRoom[0]) {
    res.status(200).json({ success: true, payload: meetingRoom[0] })
  } else {
    res.status(404).json({ success: false, payload: 'no booking found' })
  }
})

meetingRooms.post('/', async (req, res) => {
  const addMeetingRoom = await createMeetingRoom(req.body)

  if (addMeetingRoom) {
    res.status(200).json({ success: true, payload: addMeetingRoom })
  } else {
    res.status(404).send({ success: false, payload: 'create error' })
  }
})

meetingRooms.get('/:meetingRoom_id/bookings', async (req, res) => {
  const { meetingRoom_id } = req.params;

  try {
    const getFutureBookings = await getAllFutureBookingsForRoom(meetingRoom_id);
    
    if (getFutureBookings) {
      res.status(200).json({ success: true, payload: getFutureBookings });
    } else {
      res.status(404).json({ error: 'No future bookings for the specified meeting room' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching future bookings' });
  }
  
});

module.exports = meetingRooms
