import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login";
import "./styles/output.css";
import Wrapper from "./Wrapper";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage href={"/movies"} />} />
        <Route path="" element={<LoginPage href={"/movies"} />} />
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
