import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import HomePage from "./HomePage";
import EmployeeForm from "./EmployeeForm";
import DRSClosureForm from "./DRSClosureForm";
import CIEForm from "./CIEForm";
import EmailSearchPage from "./EmailSearchPage";
import PdfUploadPage from "./PdfUploadPage";
import Signup from "./Signup";

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
        <Route path="/pdf-upload" element={<PdfUploadPage />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;