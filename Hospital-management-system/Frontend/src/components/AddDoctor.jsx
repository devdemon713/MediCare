import { useState } from "react";
import api from "../services/api";

function AddDoctor() {
  const [userId, setUserId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/doctors", {
        userId,
        specialization,
        availableDays: ["Monday", "Wednesday"],
        consultationFee: fee
      });

      setMessage("Doctor added successfully");
      setUserId("");
      setSpecialization("");
      setFee("");
    } catch (err) {
      setMessage("Error adding doctor");
    }
  };

  return (
    <div>
      <h3>Add Doctor</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Doctor User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Consultation Fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        <button type="submit">Add Doctor</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddDoctor;
