import Login from "./Components/Authentication/Login";
import Home from "./Components/Authentication/Home";
import Signup from "./Components/Authentication/Signup";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import MailBoxComponent from "./Components/mailBox/MailBoxComponent";
import Inbox from "./Components/mailBox/Inbox";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  // const Navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <Routes>
        {isLoggedIn && <Route path="mail-box" element={<MailBoxComponent />} />}
        {!isLoggedIn && <Route path="login" element={<Login />}></Route>}
        <Route path="inbox" element={<Inbox/>}/>
        {!isLoggedIn && <Route path="/" element={<Signup />} />}
        {isLoggedIn && <Route path="home" element={<Home />} />}
        {/* <Route path='*' element={<Navigate to='/login'/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
