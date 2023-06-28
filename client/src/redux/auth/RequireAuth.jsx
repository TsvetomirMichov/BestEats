import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
const RequireAuth = () => {

  const { status } =useAuth();

  if (status == "Admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default RequireAuth;