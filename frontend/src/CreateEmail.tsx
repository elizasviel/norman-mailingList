import { useState } from "react";

const CreateEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <h1>Create Email</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={() => {
            fetch("http://localhost:3000/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ subject, body }),
            });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CreateEmail;
