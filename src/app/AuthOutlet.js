import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthOutlet({ navigateTo, children }) {
  const [isLogin, setIsLogin] = useState(!localStorage.getItem("token"));

  useEffect(() => {
    setIsLogin(!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  return isLogin ? children : <Navigate to={navigateTo} />;
}

export default memo(AuthOutlet);
