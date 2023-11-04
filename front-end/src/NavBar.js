import './NavBar.css'
import { useNavigate, Link } from 'react-router-dom'
import logo from './logo.png'
function NavBar() {
  const navigate = useNavigate()
 
  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              className='logo'
            
            />
          </Link>
        </div>
        <ul className='navbar__menuItems'>
          <li onClick={() => navigate('/')} className='navbar__menuItem'>
            Meetings
          </li>
          <li
            onClick={() => navigate('/bookings')}
            className='navbar__menuItem'
          >
            Bookings
          </li>
          <li
            className='navbar__menuItem'
            onClick={() => navigate('/meetingrooms/new')}
          >
            New Rooms
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar

