import Router from "./JS/Router";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <div>
        <Router />
      </div>
    </RecoilRoot>
  );
}

export default App;
