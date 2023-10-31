const express = require('express')

const { getAllBookings, getBooking, deleteBooking, createBooking } = require('../queries/booking')

const booking= express.Router()


booking.get('/', async (req, res) => {
    try {
        const bookings = await getAllBookings()
      res.status(200).json({ success: true, payload: bookings })
    } catch (error) {
      res.status(400).json({ success: false, message: 'not found!' })
    }
})
  
booking.get('/:booking_id', async (req, res) => {
    const { booking_id } = req.params
    
    const booking = await getBooking(booking_id)
    if (booking[0]) {
      res.status(200).json({ success: true, payload: booking[0] })
    } else {
      res.status(404).json({ success: false, payload: 'not found' })
    }
  })

  booking.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params
      
    const deleteBook = await deleteBooking(bookingId)
    if (deleteBook) {
      res.status(200).json({ success: true, payload: deleteBook })
    } else {
      res.status(404).json({ error: 'server error' })
    }
  })

  booking.post('/newbooking', async (req, res) => {
      const createABooking = await createBooking(req.body)
      console.log(createABooking)
    if (createABooking) {
      res.status(200).json({ success: true, payload: createABooking })
    } else {
      res.status(404).send({ success: false, payload: 'cannot book room' })
    }
})

  
module.exports = booking