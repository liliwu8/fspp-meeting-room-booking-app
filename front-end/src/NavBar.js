import './NavBar.css'
import { Link } from 'react-router-dom';
function NavBar() {
    return (
        <div className="navbar">
            <Link to='/'>Meeting Room</Link>
            <Link to='/bookings'>Bookings</Link>
            <Link to='/meetingrooms/new'>New Rooms</Link>
        </div>
    );
}

export default NavBar;