import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import "./styles/output.css";
import Wrapper from "./Wrapper";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
const userLoginApi = [{ email: "test1234@gmail.com", password: "test123456" }];
function App() {
  const [email, setEmail] = useState();
  const [passwords, setPassword] = useState();
  const [index, setIndex] = useState();
  const [isAuth, setIsAuth] = useState(true);
  const setAuthFunction = (regex) => {
    for (let i = 0; i < userLoginApi.length; i++) {
      userLoginApi[i].email === email && userLoginApi[i].password === passwords
        ? setIsAuth(true)
        : setIsAuth(false);
    }
    isAuth ? regex(true) : regex(false);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <ProtectedRoute
              Component={Wrapper}
              isAuth={isAuth}
              Redirect={"/login"}
            />
          }
        />
        <Route
          path="/login"
          element={
            !isAuth ? (
              <LoginPage
                href={isAuth ? "/movies" : ""}
                pushPassword={setPassword}
                pushEmail={setEmail}
                setAuth={setAuthFunction}
              />
            ) : (
              <Navigate to={"/movies"} />
            )
          }
        />
        <Route
          path=""
          element={
            <ProtectedRoute
              Component={Wrapper}
              isAuth={isAuth}
              Redirect={"/login"}
            />
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute
              Component={Wrapper}
              isAuth={isAuth}
              Redirect={"/login"}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
