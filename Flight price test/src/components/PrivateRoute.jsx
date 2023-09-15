import React from "react";
import { Navigate } from "react-router-dom";
import FlightApp from "../pages/FlightApp";

const PrivateRoute = ({ isAuth }) => {
  console.log(isAuth);
  return isAuth ? <FlightApp /> : <Navigate to="/login" />;
};

export default PrivateRoute;
