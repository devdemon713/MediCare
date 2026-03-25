import { useState } from "react";
import api from "../services/api";

function AddMedicalRecord({ appointmentId }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/medical-records", {
        appointmentId,
        diagnosis,
        prescription,
        notes
      });
      setMessage("Medical record added successfully");
      setDiagnosis("");
      setPrescription("");
      setNotes("");
    } catch (err) {
      setMessage("Failed to add medical record");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }} >
      <h4>Add Medical Record</h4>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
        />

        <input
          placeholder="Prescription"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          required
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddMedicalRecord;
