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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#432818",
        padding: "10px",
        width: "21vw",
      }}
    >
      <h1 style={{ color: "#FFE6A7" }}> Email Lists</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {mailingLists.map((list) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#BB9457",
              color: "black",
              alignItems: "center",
            }}
          >
            <div
              key={list.id}
              onClick={() => setSelectedList(list)}
              style={{
                alignContent: "center",
                paddingLeft: "10px",
              }}
            >
              {list.name}
            </div>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                marginLeft: "auto",
                padding: "10px",
                width: "2px",
                height: "2px",
              }}
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
            ></button>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "auto",
        }}
      >
        <input
          placeholder="Create New List"
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          style={{
            width: "100%",
          }}
        />

        <button
          style={{
            backgroundColor: "darkgreen",
            marginLeft: "auto",
            color: "#FFE6A7",
          }}
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
          +
        </button>
      </div>
    </div>
  );
};

export default BrowseLists;
