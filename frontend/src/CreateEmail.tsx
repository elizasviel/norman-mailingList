import { useState } from "react";

const CreateEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"" | "success" | "error">("");

  const handleSend = async () => {
    setIsSending(true);
    setSendStatus("");
    try {
      const response = await fetch("http://localhost:3000/emails/1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, body }),
      });
      if (response.ok) {
        setSendStatus("success");
        setSubject("");
        setBody("");
      } else {
        setSendStatus("error");
      }
    } catch (error) {
      setSendStatus("error");
    }
    setIsSending(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#FFE6A7", textAlign: "center" }}>Create Email</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            minHeight: "200px",
            resize: "vertical",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#FFE6A7",
            backgroundColor: "#2C6E31",
            border: "none",
            cursor: "pointer",
            opacity: isSending ? 0.7 : 1,
          }}
          onClick={handleSend}
          disabled={true}
        >
          {isSending ? "Sending..." : "Send Disabled"}
        </button>
        {sendStatus === "success" && (
          <p style={{ color: "green" }}>Email sent successfully!</p>
        )}
        {sendStatus === "error" && (
          <p style={{ color: "red" }}>
            Failed to send email. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateEmail;
