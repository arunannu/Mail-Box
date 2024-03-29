import Login from "./Components/Authentication/Login";
import Home from "./Components/Authentication/Home";
import Signup from "./Components/Authentication/Signup";
import { useSelector } from "react-redux";
import DeletedMails from "./Components/mailBox/DeletedMails";
import { Profile } from "./Components/Navbar/Profile";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Outbox from './Components/mailBox/Outbox';
import OpenOutbox from './Components/mailBox/OpenoutBox';
import MailBoxComponent from "./Components/mailBox/MailBoxComponent";

import Inbox from "./Components/mailBox/Inbox";
import OpenMails from "./Components/mailBox/OpenMails";
import ForgetPassword from "./Components/Authentication/ForgetPassword";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  // const Navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/mail-box" element={<MailBoxComponent />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/inbox/deletedMails/:id" element={<DeletedMails/>}/>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/openMails" element={<OpenMails />} />
        <Route path="/" element={<Signup />} />
        <Route path="/outbox/:id" element={<Outbox/>}/>
        <Route path="/openoutbox" element={<OpenOutbox/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path='*' element={<Navigate to='/login'/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
