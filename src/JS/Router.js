import { Routes, Route } from "react-router";

import Main from "./Main";
import Container from "./Container";
import Setting from "./Setting";
import Help from "./Help";
import Convert from "./Convert";
import SignIn from "./SignIn";
import Test from "./Test";
import Greeting from "./Greeting";
import Redirect from "./Redirect";
import Upload from "./Upload";
import ProjectDetail from "./ProjectDetail";

function Router() {
    return (
      <div>
        <Routes>
          {/* <Route path="/" element={<Main roopi="hello" mummoo="cute" />} /> */}
          <Route path="/" element={<Greeting />} />
          <Route path="/main" element={<Main />} />
          <Route path="/container" element={<Container />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
        </Routes>
      </div>
    );
  }
  
  export default Router;