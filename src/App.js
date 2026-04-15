import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import HomePage from "./HomePage";
import EmployeeForm from "./EmployeeForm";
import DRSClosureForm from "./DRSClosureForm";
import CIEForm from "./CIEForm";
import EmailSearchPage from "./EmailSearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/employeeform" element={<EmployeeForm />} />
        <Route path="/email-search" element={<EmailSearchPage />} />
        <Route path="/cie-form" element={<CIEForm />} />
        <Route path="/drs-closure" element={<DRSClosureForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;