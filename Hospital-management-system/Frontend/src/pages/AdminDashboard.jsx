import { useState } from "react";
import CreateDoctor from "../components/CreateDoctor";
import ViewDoctors from "../components/ViewDoctors";
import AddPatient from "../components/AddPatient";
import ViewPatients from "../components/ViewPatients";
import RestorePatient from "../components/RestorePatient";
import DashboardLayout from "../components/DashboardLayout";
import RestoreDoctors from "../components/RestoreDoctors";

function AdminDashboard() {
  const [view, setView] = useState("viewDoctors");

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Action buttons */
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <button
          onClick={() => setView("viewDoctors")}
          className={`p-4 rounded-xl shadow transition ${
            view === "viewDoctors"
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          View Doctors
        </button>

        <button
          onClick={() => setView("createDoctor")}
          className={`p-4 rounded-xl shadow transition ${
            view === "createDoctor"
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Create Doctor
        </button>

        <button
          onClick={() => setView("addPatient")}
          className={`p-4 rounded-xl shadow transition ${
            view === "addPatient"
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Add Patient
        </button>

        <button
          onClick={() => setView("viewPatients")}
          className={`p-4 rounded-xl shadow transition ${
            view === "viewPatients"
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          View Patients
        </button>

        <button
          onClick={() => setView("restorePatients")}
          className={`p-4 rounded-xl shadow transition ${
            view === "restorePatients"
              ? "bg-purple-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Restore Patients
        </button>

           <button
          onClick={() => setView("restoreDoctors")}
          className={`p-4 rounded-xl shadow transition ${
            view === "restoreDoctors"
              ? "bg-purple-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Restore Doctors
        </button>
      </div>
}
      {/* Content */}
     <div className="bg-white rounded-xl p-4 md:p-6 shadow animate-fadeIn">
  {view === "viewDoctors" && <ViewDoctors />}
  {view === "createDoctor" && <CreateDoctor />}
  {view === "addPatient" && <AddPatient />}
  {view === "viewPatients" && <ViewPatients />}
  {view === "restorePatients" && <RestorePatient />}
  {view === "restoreDoctors" && <RestoreDoctors />}

</div>

    </DashboardLayout>
  );
}

export default AdminDashboard;