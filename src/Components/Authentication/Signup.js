import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimrPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are mandatory!!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPassword("");
      setConfimrPassword("");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZl7llsSe5RE9ERRycypTVA9HqNb7nU3g",
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
        // const data= await res.json()
        navigate("/login");
        console.log("User registered successfully");
      } else {
        const data = await res.json(); //in case the POST method fails, catch the response like this
        if (data && data.error.message) {
          setError("SignUp not successful- " + data.error.message);
        } else {
          setError("Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
    setEmail("");
    setPassword("");
    setConfimrPassword("");
    alert("signup done");
  };
  return (
    <div
      className="container form-control "
      style={{
        marginTop: "50px",
        width: "600px",
        border: "2px solid black",
        borderRadius: "20px",
        backgroundColor: "grey",
      }}
    >
      <h2 style={{ textAlign: "center" }}>SignUp</h2>
      <form onSubmit={handleSignup}>
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

        <input
          className=" form-control mt-2 "
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfimrPassword(e.target.value)}
          required
        />

        <div className="mt-2 text-center">
          {!loading && (
            <button className="btn btn-primary form-control " size="sm">
              SignUp
            </button>
          )}
        </div>
      </form>
      <p className=" text-center ">
        <Link to="/login">Have an account?Login</Link>
      </p>
      {error}
    </div>
  );
};

export default Signup;
