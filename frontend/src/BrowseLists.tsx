import { useState, useEffect } from "react";

const BrowseLists = ({
  setSelectedList,
}: {
  setSelectedList: (list: any) => void;
}) => {
  const [mailingLists, getAllMailingLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/mailingLists")
      .then((res) => res.json())
      .then((data) => getAllMailingLists(data));
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#432818",
    padding: "20px",
    width: "16vw",
    border: "2px solid #FFE6A7",
    height: "100vh",
    boxSizing: "border-box" as const,
  };

  const headerStyle = {
    color: "#FFE6A7",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #FFE6A7",
    backgroundColor: "#2C1A10",
    color: "#FFE6A7",
  };

  const buttonStyle = {
    backgroundColor: "#2C6E31",
    color: "#FFE6A7",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
  };

  const addNewList = async () => {
    await fetch("http://localhost:3000/mailingLists", {
      method: "POST",
      body: JSON.stringify({ name: newListName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetch("http://localhost:3000/mailingLists")
      .then((res) => res.json())
      .then((data) => getAllMailingLists(data));
    setNewListName("");
  };

  if (mailingLists.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Email Lists</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#484848",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFE6A7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3 style={{ color: "#FFE6A7", marginTop: "20px" }}>
            No email lists yet
          </h3>
          <p style={{ color: "#BBB", marginTop: "10px" }}>
            Create a new list to get started
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <input
            placeholder="New List Name"
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={addNewList}>
            Add
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Email Lists</h1>
        <div
          style={{
            border: "1px solid #858585",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            flex: 1,
            backgroundColor: "#484848",
            marginBottom: "20px",
          }}
        >
          {mailingLists.map((list) => (
            <div
              key={list.id}
              onClick={() => setSelectedList(list)}
              className="listSelector"
              style={{
                border: "0.1px solid #858585",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "40px",
                backgroundColor: "#BB9457",
                color: "black",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <p style={{ paddingLeft: "10px", flex: 1 }}>{list.name}</p>
              <button
                style={{
                  color: "white",
                  backgroundColor: "#6E2C2C",
                  border: "none",
                  height: "100%",
                  width: "40px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  fetch(`http://localhost:3000/mailingLists/${list.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.length === 0) {
                        fetch(`http://localhost:3000/mailingLists/${list.id}`, {
                          method: "DELETE",
                        }).then(() => {
                          fetch("http://localhost:3000/mailingLists")
                            .then((res) => res.json())
                            .then((data) => getAllMailingLists(data))
                            .then(() => {
                              setSelectedList(null);
                            });
                        });
                      } else {
                        alert("List not empty");
                      }
                    });
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <input
            placeholder="New List Name"
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={addNewList}>
            Add
          </button>
        </div>
      </div>
    );
  }
};

export default BrowseLists;
