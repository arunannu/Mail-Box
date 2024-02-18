import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
