//this component checks if a user is authenticate
//if true he will be redirected to home page else he
//will be redirected back to login

import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { DataContext } from "./TheContext";

function PrivateRoute({ element }) {
  const { fakeAuthService, token } = useContext(DataContext);
  console.log("fake auth private", fakeAuthService.isAuthenticated);

  

  if (
    
    !fakeAuthService.isAuthenticated
  ) {
    
    return <Navigate to="/" replace />;
  }

  return (
    <div className="position-relative" style={{ height: "max-content" }}>
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
