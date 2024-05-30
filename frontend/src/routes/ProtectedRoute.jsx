/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {

  
  const { token, role } = useContext(authContext); // Fixed the useContext syntax
  const isAllowed = allowedRoles.includes(role); // Fixed typos in includes and allowedRoles

  const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />; // Fixed typos and added missing curly braces

  return accessibleRoute;
};

export default ProtectedRoute;
