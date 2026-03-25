import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/doctor"
  element={
    <ProtectedRoute allowedRole="doctor">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient"
  element={
    <ProtectedRoute allowedRole="patient">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
     <Footer />
    </BrowserRouter>
   
  );
}

export default App;
