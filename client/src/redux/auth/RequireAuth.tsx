import { Navigate, Outlet } from "react-router-dom";
import { useAppselector } from '../store';
// import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { RootState } from "../store";

const RequireAuth = () => {
  const token = useAppselector((state: RootState) => state.auth.token)
  
  const { status } = useAuth();

  if (token) {

    if (status === "Admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/login" replace={true} />;
    }
  }

};

export default RequireAuth;