import { Link } from "react-router-dom";

function Navbar() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/container">Container</Link>
          </li>
          <li>
            <Link to="/setting">Setting</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>        
          </li>
        </ul>
      </div>
    );
  }
  
  export default Navbar;