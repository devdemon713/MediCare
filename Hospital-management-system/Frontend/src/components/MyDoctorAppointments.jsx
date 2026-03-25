import { useEffect, useState } from "react";
import api from "../services/api";
import AddMedicalRecord from "./AddMedicalRecord";

function MyDoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/doctor");
      console.log("APPOINTMENTS RESPONSE:", res.data);
      setAppointments(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load appointments");
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      await api.put(`/appointments/${appointmentId}/complete`);

      // update UI instantly
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, status: "completed" }
            : appt
        )
      );
    } catch (err) {
      alert("Failed to mark appointment completed");
    }
  };

  return (
    <div>
      <h3>My Appointments</h3>
     {error && <p style={{ color: "red" }}>{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
    <div className="overflow-x-auto">
  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
    <thead className="bg-purple-600 text-white">
      <tr>
        <th className="p-3 text-left">Patient</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Action</th>
      </tr>
    </thead>

    <tbody className="bg-white">
      {appointments.map((appt) => (
        <tr
          key={appt._id}
          className="border-b hover:bg-gray-100 transition"
        >
          <td>{appt.patientId?.userId?.name}</td>

          <td className="p-3">
            {new Date(appt.appointmentDate).toLocaleDateString()
}
          </td>
          <td className="p-3 capitalize">
            <span
              className={`px-2 py-1 rounded text-sm ${
                appt.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : appt.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {appt.status}
            </span>
          </td>
          <td className="p-3">
            <AddMedicalRecord appointmentId={appt._id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
}

export default MyDoctorAppointments;
