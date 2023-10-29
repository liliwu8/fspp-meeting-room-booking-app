//dependencies
const express = require('express')

//sub routes
const meetingRoomsController = express.Router()

const {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  updatingMeetingRoom,
  deleteMeetingRoom,
  getAllFutureBookingsForRoom,
} = require('../queries/meetingRoom')

//display all meeting rooms
meetingRoomsController.get('/', async (req, res) => {
  try {
    const allMeetingRooms = await getAllMeetingRooms()
    res.status(200).json({ success: true, payload: allMeetingRooms })
  } catch (error) {
    res.status(404).json({ sucesss: false, message: 'no meeting room found!' })
  }
})

meetingRoomsController.get('/:meetingroom_id', async (req, res) => {
  const { meetingroom_id } = req.params
  const meetingRoom = await getMeetingRoom(meetingroom_id)
console.log(meetingRoom)
  if (meetingRoom[0]) {
    res.status(200).json({ success: true, payload: meetingRoom[0] })
  } else {
    res.status(404).json({ success: false, payload: 'no booking found' })
  }
})

meetingRoomsController.post('/newmeeting-room', async (req, res) => {
  const addMeetingRoom = await createMeetingRoom(req.body)

  if (addMeetingRoom) {
    res.status(200).json({ success: true, payload: addMeetingRoom })
  } else {
    res.status(404).send({ success: false, payload: 'create error' })
  }
})

meetingRoomsController.put('/updatemeeting-room', async (req, res) => {
  const changeMeeting = await updatingMeetingRoom(req.body)

  if (changeMeeting) {
    res.status(200).json({ success: true, payload: changeMeeting })
  } else {
    res.status(400).json({ success: false, payload: 'update error ' })
  }
})

meetingRoomsController.delete(
  '/deleteroom/:meetingroomid',
  async (req, res) => {
    const { meetingroomid } = req.params
    const deleteOneMeetingRoom = await deleteMeetingRoom(meetingroomid)
    if (deleteOneMeetingRoom) {
      res.status(200).json({ success: true, payload: deleteOneMeetingRoom })
    } else {
      res.status(404).json({ error: 'server error' })
    }
  }
)

meetingRoomsController.get('/:meetingRoom_id/bookings', async (req, res) => {
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

module.exports = meetingRoomsController
