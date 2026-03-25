import { useState } from "react";
import api from "../services/api";

function AddPatient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/patients", {
        name,
        email,
        password,
        age,
        gender
      });

      setMessage("Patient added successfully");
      setName("");
      setEmail("");
      setPassword("");
      setAge("");
      setGender("");
    } catch (err) {
  console.error("Backend error:", err.response?.data || err.message);
  setMessage(err.response?.data?.message || "Patient creation failed");
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
      <h3>Add Patient</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <button type="submit">Add Patient</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPatient;
