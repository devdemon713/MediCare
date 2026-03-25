import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my");
        setAppointments(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h3>My Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctorId?.userId?.name}</td>
                <td>{appt.doctorId?.specialization}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;
