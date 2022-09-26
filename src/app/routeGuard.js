import { Navigate, Outlet } from "react-router-dom";

const createOutlet = (condition) => {
  return ({ navigateTo }) => {
    if (condition) return <Outlet />;
    return <Navigate to={navigateTo} />;
  };
};

const isLogin = () => !!localStorage.getItem("token");

export const PublicOutlet = () => <Outlet />;
export const AuthOutlet = createOutlet(!isLogin());
export const PrivateOutlet = createOutlet(isLogin());
