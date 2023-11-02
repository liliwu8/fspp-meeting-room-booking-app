// import './NavBar.css'
// import { Link } from 'react-router-dom';
// function NavBar() {
//     return (
//         <div className="navbar">
//             <Link to='/'>Meeting Room</Link>
//             <Link to='/bookings'>Bookings</Link>
//             <Link to='/meetingrooms/new'>New Rooms</Link>
//         </div>
//     );
// }

// export default NavBar;

import './NavBar.css'
import { useNavigate, Link } from 'react-router-dom'
import {  useState } from 'react'
import logo from './logo.png'
function NavBar() {
 
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              className='logo'
              width={150}
              height={100}
            />
          </Link>
        </div>
        <div
          className='navbar__hamburger'
          style={{ display: 'none' }}
          onClick={toggleMenu}
        >
          =
        </div>
        <ul>
         

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
 {/* <li>
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
          </li> */}

           // const [activeTab, setActiveTab] = useState(null)

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab)
  // }