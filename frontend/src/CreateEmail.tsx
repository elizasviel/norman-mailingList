import { useState } from "react";

const CreateEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <h1 style={{ color: "#FFE6A7" }}>Create Email</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "81%",
        }}
      >
        <textarea
          placeholder="Subject"
          style={{ alignContent: "center" }}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          style={{ textAlign: "left", verticalAlign: "top", height: "95%" }}
        />
        <button
          style={{
            height: "4.5%",
            color: "#FFE6A7",
            backgroundColor: "darkgreen",
          }}
          onClick={() => {
            fetch("http://localhost:3000/emails/1/send", {
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
