import './NavBar.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
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
{
  /* <li>
            <Link
              to='/'
              className={`nav-tab ${activeTab === '/' ? 'active' : ''}`}
              onClick={() => handleTabClick('/')}
            >
              Meeting Room
            </Link>
          </li>
          <li>
            <Link
              to='/bookings'
              className={`nav-tab ${activeTab === '/bookings' ? 'active' : ''}`}
              onClick={() => handleTabClick('/bookings')}
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to='/meetingrooms/new'
              className={`nav-tab ${
                activeTab === '/meetingrooms/new' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('/meetingrooms/new')}
            >
              New Rooms
            </Link>
          </li> */
}

// const [activeTab, setActiveTab] = useState(null)

// const handleTabClick = (tab) => {
//   setActiveTab(tab)
// }
