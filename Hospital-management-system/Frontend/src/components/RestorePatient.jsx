import { useEffect, useState } from "react";
import api from "../services/api";

function RestorePatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchInactive();
  }, []);

  const fetchInactive = async () => {
    const res = await api.get("/patients?inactive=true");
    setPatients(res.data);
  };

  const restorePatient = async (id) => {
    await api.put(`/patients/${id}/restore`);
    setPatients(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div>
      <h3>Deactivated Patients</h3>

      {patients.length === 0 ? (
        <p>No inactive patients</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p._id}>
                <td>{p.userId?.name}</td>
                <td>{p.userId?.email}</td>
                <td>
                  <button onClick={() => restorePatient(p._id)}>
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RestorePatients;
