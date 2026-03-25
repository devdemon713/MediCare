import { useEffect, useState } from "react";
import api from "../services/api";

function RestoreDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInactiveDoctors();
  }, []);

  const fetchInactiveDoctors = async () => {
    try {
      const res = await api.get("/doctors/inactive");
      setDoctors(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load inactive doctors");
    } finally {
      setLoading(false);
    }
  };

  const restoreDoctor = async (userId) => {
    if (!window.confirm("Restore this doctor?")) return;

    try {
      await api.put(`/doctors/${userId}/restore`);
      setDoctors(prev => prev.filter(d => d.userId._id !== userId));
    } catch {
      alert("Failed to restore doctor");
    }
  };

  if (loading) return <p>Loading inactive doctors...</p>;
  if (doctors.length === 0) return <p>No inactive doctors found</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Restore Doctors</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {doctors.map(d => (
          <div key={d._id} className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold text-blue-600">
              {d.userId?.name}
            </h4>
            <p>{d.specialization}</p>

            <button
              onClick={() => restoreDoctor(d.userId._id)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestoreDoctors;
