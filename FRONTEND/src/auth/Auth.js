import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "../components/Login";

export const Auth = ({children}) => {
  const [isTokenExpired, setIsTokenExpired] = useState(true);

  useEffect(() => {
    if (Cookies.get(`tkn`)) setIsTokenExpired(false);
  }, []);

  return (
    <>
        {!isTokenExpired ? (
            <>{children}</>
        ) : (
            <>
                <Login />
            </>
        ) }
    </>
  )
};
