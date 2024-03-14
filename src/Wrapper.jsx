import { Routes, Route } from "react-router-dom";
import OutletWrapper from "./OutletWrapper";
import LandingPage from "./LandingPage";
export default function Wrapper() {
  return (
    <>
      <OutletWrapper>
        <Routes>
          <Route path="/movies" element={<LandingPage />} />
        </Routes>
      </OutletWrapper>
    </>
  );
}
