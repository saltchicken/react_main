import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = not authenticated

  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get("access_token");
      if (!accessToken) {
        navigate("/login");
        // return <Navigate to="/login" />;
      }
      const response = await fetch(`/api/auth/`);
      const responseJSON = await response.json();

      if (responseJSON) {
        setIsAuthenticated(true);
        console.log("Verified");
      } else {
        setIsAuthenticated(false);
        console.log("Not Verified");
      }
    })();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // navigate("/login");
    console.log("hello there");
    return <div>Not authenticated...</div>;
    // return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    return children;
  }
};

export default PrivateRoute;
