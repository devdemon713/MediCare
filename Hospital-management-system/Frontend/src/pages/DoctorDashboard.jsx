import { useState } from "react";
import MyDoctorAppointments from "../components/MyDoctorAppointments";
import DashboardLayout from "../components/DashboardLayout";

function DoctorDashboard() {
  const [view, setView] = useState("appointments");
  

  return (
    <DashboardLayout title="Doctor Dashboard">
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setView("appointments")}>
          My Appointments
        </button>
        
      </div>
      
      {view === "appointments" && <MyDoctorAppointments />}
    </DashboardLayout>
    
  );
}

export default DoctorDashboard;
