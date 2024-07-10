import { useState, useEffect } from "react";

const Dashboard = () => {
  const [recentlySent, setRecentlySent] = useState([]);
  const [mailingLists, setMailingLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/mailingLists")
      .then((res) => res.json())
      .then((data) => setMailingLists(data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Mailing Lists</h2>
      <ul>
        {mailingLists.map((list) => (
          <li key={list.id}>
            {list.name}
            <button
              onClick={async () => {
                await fetch(`http://localhost:3000/mailingLists/${list.id}`, {
                  method: "DELETE",
                });
                fetch("http://localhost:3000/mailingLists")
                  .then((res) => res.json())
                  .then((data) => setMailingLists(data));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New List Name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button
        onClick={async () => {
          await fetch("http://localhost:3000/mailingLists", {
            method: "POST",
            body: JSON.stringify({ name: newListName }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          fetch("http://localhost:3000/mailingLists")
            .then((res) => res.json())
            .then((data) => setMailingLists(data));
        }}
      >
        Create New Mailing List
      </button>
      <h2>Recently Sent</h2>
      <ul>
        {recentlySent.map((email) => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
