import { useState } from "react";
import api from "../services/api";

function CreateDoctor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/doctors/create", {
        name,
        email,
        password,
        specialization,
        consultationFee
      });

      setMessage(res.data.message);

      // clear form
      setName("");
      setEmail("");
      setPassword("");
      setSpecialization("");
      setConsultationFee("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error creating doctor");
    }
  };

  return (
    <div  style={{
      maxWidth: "400px",
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3>Create Doctor</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Consultation Fee"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Doctor</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateDoctor;
