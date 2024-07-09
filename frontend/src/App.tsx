import { useState } from "react";

import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/addUser", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.body);
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default App;
