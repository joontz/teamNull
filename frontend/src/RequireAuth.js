import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);


  useEffect(() => {
    fetch("http://localhost:9000/checktoken", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAuth(true);
        } else if (res.status === 401){
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      })
  }, [])
  
  return isAuth ? children : <Navigate to="/login" />;
};

export default RequireAuth;
