import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are mandatory!!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZl7llsSe5RE9ERRycypTVA9HqNb7nU3g",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (res.ok) {
        setLoading(false);
        const data= await res.json();
        dispatch(authAction.login(data.idToken));
        localStorage.setItem("email", data.email);
        localStorage.setItem("numberOfEmails",0);
        localStorage.setItem("token", data.idToken);

        console.log("User LoggedIn successfully");
          navigate("/home");
        
      } else {
        const data = await res.json(); //in case the POST method fails, catch the response like this
        if (data && data.error.message) {
          setError("Login not successful- " + data.error.message);
        } else {
          setError("Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("Error logining up:", error);
    }
    setEmail("");
    setPassword("");
    
    alert("Login done");
  };
  return (
    <div
      className="container form-control "
      style={{
        marginTop: "40px",
        width: "600px",
        border: "2px solid black",
        borderRadius: "20px",
        backgroundColor: "grey",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className=" mt-2 form-control  "
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className=" mt-2 form-control "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        

        <div className="mt-2 text-center">
          { !loading && <button className="btn btn-primary form-control " size="sm">
            Login
          </button>}
        </div>
      </form>
      <p className=" text-center mt-2  ">
        <Link to="/">Don't Have Account? SignUp Now!!</Link>
      </p>
      <p className=" text-center mt-2  ">
        <Link to="/forgetPassword">Forget Password?</Link>
      </p>
      {error}

    </div>
  );
};

export default Login;
