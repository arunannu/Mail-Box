import React, { useState } from "react";
import { Link } from "react-router-dom";
import Inbox from "../mailBox/Inbox";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBZl7llsSe5RE9ERRycypTVA9HqNb7nU3g",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            alert("Password reset request sent");
          });
        } else {
          response.json().then((data) => {
            if (data && data.error.message) {
              setError("SignUp not successful- " + data.error.message);
            } else {
              setError("Some error occured!! Please try again..");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Reset Password request not sent - " + err.message);
      });
    setEmail("");
  };
  return (
    <>
      <div
        className="container form-control "
        style={{
          marginTop: "40px",
          width: "600px",
          border: "2px solid black",
          borderRadius: "20px",
          backgroundColor: "grey",
          display: "flex",
        }}
      >
        <form>
          <h2 style={{ textAlign: "center" }}>Forgot Password?</h2>
          <i>Enter your registered email.</i>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p>{error}</p>
          {!loading && (
            <button
              type="submit"
              onClick={passwordChangeHandler}
              className=" btn btn-success"
            >
              Send link
            </button>
          )}
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>
          {loading && <h2>Submitting Data...</h2>}
        </form>
        
      </div>
    </>
  );
};

export default ForgetPassword;
