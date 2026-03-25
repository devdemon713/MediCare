import { useEffect, useState } from "react";
import api from "../services/api";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/appointments", {
      doctorId,
      appointmentDate: date,
      timeSlot: "10:00 AM"
    });
      setMessage("Appointment booked successfully");
      setDoctorId("");
      setDate("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      margin: "20px auto"
    }} >
      <h3>Book Appointment</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.userId?.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Book</button>
      </form>

      {message && (
  <p style={{ color: message.includes("success") ? "green" : "red" }}>
    {message}
  </p>
)}

    </div>
  );
}

export default BookAppointment;
