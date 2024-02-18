import Login from "./Components/Authentication/Login";
import Home from "./Components/Authentication/Home";
import Signup from "./Components/Authentication/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
