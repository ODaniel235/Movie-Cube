import { Routes, Route, Navigate } from "react-router-dom";
import OutletWrapper from "./OutletWrapper";
import LandingPage from "./LandingPage";
export default function Wrapper() {
  return (
    <>
      <OutletWrapper>
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/movies" element={<LandingPage />} />
          <Route path="/movies/genres" element={<Navigate to={"/movies"} />} />
        </Routes>
      </OutletWrapper>
    </>
  );
}
