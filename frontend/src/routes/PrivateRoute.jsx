import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/Context";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
