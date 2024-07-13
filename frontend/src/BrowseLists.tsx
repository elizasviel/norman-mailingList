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
        width: "13vw",
        border: "2px solid #FFE6A7",
      }}
    >
      <h1 style={{ color: "#FFE6A7" }}> Email Lists</h1>

      <div
        style={{
          border: "1px solid #858585",
          borderRadius: "2px",

          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "69%",
          backgroundColor: "#484848",
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
              height: "20px",
              backgroundColor: "#BB9457",
              color: "black",
              alignItems: "center",
            }}
          >
            <p style={{ paddingLeft: "5px" }}>{list.name}</p>
            <button
              style={{
                color: "white",
                marginLeft: "auto",
                height: "20px",
                borderRadius: "0px",
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
              x
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "auto",
          gap: "5px",
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
