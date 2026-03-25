import { useEffect, useState } from "react";
import api from "../services/api";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const deactivateDoctor = async (userId) => {
    if (!window.confirm("Deactivate this doctor?")) return;

    try {
      await api.put(`/doctors/${userId}/deactivate`);
      setDoctors((prev) =>
        prev.filter((d) => d.userId._id !== userId)
      );
    } catch {
      alert("Failed to deactivate doctor");
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <h3 className="text-xl font-semibold">Doctors</h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-64"
          />
          <button
            onClick={() => setView("table")}
            className={`px-3 py-2 rounded ${
              view === "table" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setView("cards")}
            className={`px-3 py-2 rounded ${
              view === "cards" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <p>No doctors found</p>
      ) : view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Specialization</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((d) => (
                <tr key={d._id} className="border-b">
                  <td className="p-3">{d.userId?.name}</td>
                  <td className="p-3">{d.specialization}</td>
                  <td className="p-3">₹{d.consultationFee}</td>
                  <td className="p-3">
                    <button
                      type= "button"
                      onClick={() => deactivateDoctor(d.userId._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDoctors.map((d) => (
            <div key={d._id} className="bg-white p-4 rounded-xl shadow">
              <h4 className="font-semibold text-green-600">
                {d.userId?.name}
              </h4>
              <p>{d.specialization}</p>
              <p>₹{d.consultationFee}</p>
              <button
                onClick={() => deactivateDoctor(d.userId._id)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded"
              >
                Deactivate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewDoctors;
