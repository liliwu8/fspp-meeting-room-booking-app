import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './NavBar'
import NewRoom from './Pages/NewRoom'
import SingleBooking from './Pages/SingleBooking'
import SingleMeetingRoom from './Pages/SingleMeetingRoom'
import Bookings from './Pages/Bookings'
import Footer from './Footer'
import './App.css'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route>
          <Route path='/' element={<Home />} />
          <Route path='/meetingrooms/:id' element={<SingleMeetingRoom />} />
          <Route path='/meetingrooms/new' element={<NewRoom />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/bookings/:id' element={<SingleBooking />} />
         
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
