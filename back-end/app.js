// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const meetingRoomsController = require('./controllers/meetingRoomsController')
const bookingControllers = require('./controllers/bookingControllers')

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to meeting room booking app');
});

app.use('/meeting-rooms', meetingRoomsController)

app.use('/bookings', bookingControllers)



app.get('*', (req, res) => {
  res.status(404).send('Not found!');
});

// EXPORT
module.exports = app;