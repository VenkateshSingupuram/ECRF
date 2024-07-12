import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, role }) => {
  let location = useLocation();
  let roles = "";
  let redirectedUrl = "";
  const token = Cookies.get('tkn');
  if(token) {
    const cData = jwtDecode(token);
    // console.log(cData);
    if(cData) {
      roles = cData?.roles;
      if(roles === 'ROLE_ADMIN') redirectedUrl = "/userList";
      else redirectedUrl = "/";
    }
  } else redirectedUrl = "/login";

  return (
    role.split(",").includes(roles)
    // true
      ? children 
      : <Navigate to={`${redirectedUrl}`} state={{ from: location }} replace={true} />
  );
};

export default ProtectedRoute;