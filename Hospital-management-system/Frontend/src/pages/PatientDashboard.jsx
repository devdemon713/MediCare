import { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import MyAppointments from "../components/MyAppointments";
import DashboardLayout from "../components/DashboardLayout";
import MyMedicalRecords from "../components/MyMedicalRecords";

function PatientDashboard() {
  const [view, setView] = useState("book");

  return (
    <DashboardLayout title="Patient Dashboard">
      {/* Action buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("book")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "book"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Book Appointment
        </button>

        <button
          onClick={() => setView("appointments")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "appointments"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          My Appointments
        </button>

         <button onClick={() => setView("records")}>
  My Prescriptions
</button>

      </div>

      {/* Content */}
      <div className="animate-fadeIn">
        {view === "book" && <BookAppointment />}
        {view === "appointments" && <MyAppointments />}
        {view === "records" && <MyMedicalRecords />}
      </div>
    </DashboardLayout>
  );
}

export default PatientDashboard;

