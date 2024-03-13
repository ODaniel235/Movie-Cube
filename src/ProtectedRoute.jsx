import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ isAuth, Component, Redirect }) {
  if (isAuth) {
    return <Component />;
  } else {
    return <Navigate to={Redirect} />;
  }
}
