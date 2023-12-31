const express = require('express')

const {
  getAllBookings,
  getBooking,
  deleteBooking,
  createBooking,
  findAvailableMeetingRooms,
  updateBooking,
} = require('../queries/booking')

const booking = express.Router()

booking.get('/', async (req, res) => {
  const bookings = await getAllBookings()
  try {
    if (bookings) {
      res.status(200).json({ success: true, payload: bookings })
    } else {
      res.status(400).json({ success: false, message: 'not found!' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

booking.get('/:booking_id', async (req, res) => {
  const { booking_id } = req.params

  const booking = await getBooking(booking_id)

  try {
    if (booking[0]) {
      res.status(200).json({ success: true, payload: booking[0] })
    } else {
      res.status(404).json({ success: false, payload: 'not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

booking.get('/meeting-rooms/available', async (req, res) => {
  const { start_time, end_time, floor, capacity } = req.query

  // Check if start_time and end_time exist in the request.
  if (!start_time || !end_time) {
    res.status(400).json({
      success: false,
      message: 'Both start_time and end_time are required',
    })
    return
  }

  try {
    const availableMeetingRooms = await findAvailableMeetingRooms(
      start_time,
      end_time,
      capacity === '' ? undefined : parseInt(capacity),
      floor === '' ? undefined : parseInt(floor)
    )

    if (availableMeetingRooms.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No meeting rooms are available',
        payload: [],
      })
    } else {
      res.status(200).json({ success: true, payload: availableMeetingRooms })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

booking.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params

  const deleteBook = await deleteBooking(bookingId)
  try {
    if (deleteBook) {
      res.status(200).json({ success: true, payload: deleteBook })
    } else {
      res.status(404).json({ error: 'server error' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

booking.post('/', async (req, res) => {
  const createABooking = await createBooking(req.body)
  try {
   if (createABooking) {
    res.status(200).json({ success: true, payload: createABooking })
  } else {
    res.status(404).send({ success: false, payload: 'cannot book room' })
  }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' })
}
 
})


booking.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateABooking = await updateBooking(id, req.body);

  try {
    if (updateABooking.id) {
      res.status(200).json({ success: true, message: 'Booking updated successfully', payload: updateABooking });
    } else if (updateABooking === "Booking overlaps with an existing booking.") {
      res.status(400).json({ success: false, message: 'Cannot update the booking due to overlapping time slot.' });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




module.exports = booking
