import { useState, useEffect } from "react";
import "./ManageList.css"; // We'll create this CSS file

const ManageList = ({ selectedList }: { selectedList: any }) => {
  const emailChecker = new RegExp("^.+@.+\\..+$");
  const [recipients, setRecipients] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchRecipients();
  }, [selectedList]);

  const fetchRecipients = () => {
    fetch(`http://localhost:3000/mailingLists/${selectedList.id}`)
      .then((res) => res.json())
      .then((data) => setRecipients(data));
  };

  const handleSubmit = async () => {
    if (!emailChecker.test(email)) {
      alert("Invalid email");
      return;
    }
    await fetch(`http://localhost:3000/mailingLists/${selectedList.id}/add`, {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchRecipients();
    setFirstname("");
    setLastname("");
    setEmail("");
  };

  const handleDelete = async (recipientId: string) => {
    await fetch(
      `http://localhost:3000/mailingLists/${selectedList.id}/${recipientId}`,
      {
        method: "DELETE",
      }
    );
    fetchRecipients();
  };

  return (
    <div className="manage-list">
      <h1 className="list-title">{selectedList.name}</h1>
      <div className="recipient-table">
        <div className="table-header">
          <div className="header-cell">First Name</div>
          <div className="header-cell">Last Name</div>
          <div className="header-cell">Email</div>
          <div className="header-cell"></div>
        </div>
        {recipients.length === 0 ? (
          <div className="empty-message">
            No recipients in {selectedList.name}.<br />
            Please add a recipient to get started.
          </div>
        ) : (
          recipients.map((recipient: any, index: number) => (
            <div key={index} className="recipient-row">
              <div className="cell">{recipient.firstname}</div>
              <div className="cell">{recipient.lastname}</div>
              <div className="cell">{recipient.email}</div>
              <button
                className="delete-button"
                onClick={() => handleDelete(recipient.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      <div className="input-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="input"
        />
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageList;
