import { useEffect, useState } from "react";
import api from "../services/api";

function PatientHistory() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/medical-records/my");
        setRecords(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to load medical history");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h3>My Medical History</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {records.length === 0 ? (
        <p>No medical records found</p>
      ) : (
        records.map((record) => (
          <div
            key={record._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p>
              <strong>Doctor:</strong> {record.doctorId?.name}
            </p>
            <p>
              <strong>Diagnosis:</strong> {record.diagnosis}
            </p>
            <p>
              <strong>Prescription:</strong> {record.prescription}
            </p>
            {record.notes && (
              <p>
                <strong>Notes:</strong> {record.notes}
              </p>
            )}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(record.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientHistory;
