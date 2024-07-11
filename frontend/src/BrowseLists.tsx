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
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <h1>All Mailing Lists</h1>
      {mailingLists.map((list) => (
        <div key={list.id}>
          <p onClick={() => setSelectedList(list)}>
            {list.name}
            <button
              onClick={() => {
                //check if list empty
                fetch(`http://localhost:3000/mailingLists/${list.id}`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.length === 0) {
                      fetch(`http://localhost:3000/mailingLists/${list.id}`, {
                        method: "DELETE",
                      }).then(() => {
                        fetch("http://localhost:3000/mailingLists")
                          .then((res) => res.json())
                          .then((data) => getAllMailingLists(data));
                      });
                    } else {
                      alert("List not empty");
                    }
                  });
              }}
            >
              Delete
            </button>
          </p>
        </div>
      ))}
      <input
        type="text"
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
            .then((data) => getAllMailingLists(data));
        }}
      >
        Create New List
      </button>
    </div>
  );
};

export default BrowseLists;
