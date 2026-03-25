import { useEffect, useState } from "react";
import api from "../services/api";

function MyMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/medical-records/my");
      setRecords(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load medical records");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading medical records...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (records.length === 0) return <p>No medical records found</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">My Prescriptions</h3>

      {records.map((r) => (
        <div
          key={r._id}
          className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600"
        >
          <p className="font-semibold text-blue-600">
            Doctor: {r.doctorId?.userId?.name || "Unknown"}
          </p>

          <p>
            <b>Date:</b>{" "}
            {new Date(r.createdAt).toLocaleDateString()}
          </p>

          <p><b>Diagnosis:</b> {r.diagnosis}</p>
          <p><b>Prescription:</b> {r.prescription}</p>
          <p><b>Notes:</b> {r.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default MyMedicalRecords;
