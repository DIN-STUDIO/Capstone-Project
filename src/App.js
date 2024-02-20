import { Link } from "react-router-dom";

import Navbar from "./JS/Navbar";
import Router from "./JS/Router";

function App() {
  return (
    <div>
      <Link to="/">Main Logo</Link>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
