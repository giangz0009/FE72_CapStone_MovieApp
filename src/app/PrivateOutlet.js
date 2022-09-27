import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet({ navigateTo }) {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  if (isLogin) return <Outlet />;

  return <Navigate to={navigateTo} />;
}

export default memo(PrivateOutlet);
