import { Navigate, Outlet } from "react-router-dom";

const createOutlet = () => {
  return ({ isLogin, navigateTo }) => {
    if (isLogin) return <Outlet />;
    return <Navigate to={navigateTo} />;
  };
};

export const PublicOutlet = () => <Outlet />;
export const AuthOutlet = createOutlet();
export const PrivateOutlet = createOutlet();
