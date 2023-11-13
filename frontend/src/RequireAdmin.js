import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/checkadmin", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setIsAdmin(true);
      } else if (res.status === 401) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    });
  }, []);

  return isAdmin ? children : <Navigate to="/login" />;
};

export default RequireAdmin;