import { useEffect, useState } from "react";
import api from "../services/api";

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deactivatePatient = async (patientId) => {
    if (!window.confirm("Deactivate this patient?")) return;

    try {
      await api.put(`/patients/${patientId}/deactivate`);
      setPatients((prev) =>
        prev.filter((p) => p._id !== patientId)
      );
    } catch {
      alert("Failed to deactivate patient");
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.userId?.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading patients...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <h3 className="text-xl font-semibold">Patients</h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search patient..."
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

      {filteredPatients.length === 0 ? (
        <p>No patients found</p>
      ) : view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg shadow">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3">{p.userId?.name}</td>
                  <td className="p-3">{p.age}</td>
                  <td className="p-3 capitalize">{p.gender}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deactivatePatient(p._id)}
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
          {filteredPatients.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow">
              <h4 className="font-semibold text-green-600">
                {p.userId?.name}
              </h4>
              <p>Age: {p.age}</p>
              <p className="capitalize">Gender: {p.gender}</p>
              <button
                onClick={() => deactivatePatient(p._id)}
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

export default ViewPatients;
