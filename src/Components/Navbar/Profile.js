import React from "react";
import OpenMails from "../mailBox/OpenMails";
import { Link } from "react-router-dom";
export const Profile = () => {
  return (
    <div>
      Profile
      <OpenMails/>
      <Link to="/inbox">proile</Link>
    </div>
  );
};
