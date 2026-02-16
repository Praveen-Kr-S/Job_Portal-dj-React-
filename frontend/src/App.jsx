
import { useState } from 'react'
import './App.css'
import RegisterPage from './RegisterPage.jsx'
import LoginPage from './LoginPage.jsx'
import JobListPage from './JobListPage.jsx'
import ApplyJobPage from './ApplyJobPage.jsx'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'

function App() {

  return (

    // <>
    //   {/* <RegisterPage /> */}
    //   {/* <LoginPage /> */}
    //   {/* <JobListPage /> */}
    //   {/* <ApplyJobPage /> */}
      

    // </>
    <BrowserRouter>
      <Routes>
        {/* OPEN REGISTER PAGE DIRECTLY */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/apply/:jobId" element={<ApplyJobPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
