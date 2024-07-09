import { useState } from "react";
import "./App.css";

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => {
            fetch("http://localhost:3000/users", {
              method: "POST",
              body: JSON.stringify({ firstname, lastname, email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
