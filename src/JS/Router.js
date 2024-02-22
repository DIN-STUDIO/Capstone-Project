import { Routes, Route } from "react-router";

import Main from "./Main";
import Container from "./Container";
import Setting from "./Setting";
import Help from "./Help";
import Convert from "./Convert";
import SignIn from "./SignIn";
import Test from "./Test";

function Router() {
    return (
      <div>
        <Routes>
          {/* <Route path="/" element={<Main roopi="hello" mummoo="cute" />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/container" element={<Container />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    );
  }
  
  export default Router;