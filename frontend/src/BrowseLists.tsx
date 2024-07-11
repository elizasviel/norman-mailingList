import { useState, useEffect } from "react";

const BrowseLists = ({ setSelectedList }: { setSelectedList: any }) => {
  const [allMailingLists, setAllMailingLists] = useState([]);
  const [createList, setCreateList] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/mailingLists")
      .then((res) => res.json())
      .then((data) => setAllMailingLists(data));
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>
        All Mailing Lists All Mailing Lists All Mailing Lists All Mailing Lists
        All Mailing Lists
      </p>
      <input
        type="text"
        value={createList}
        onChange={(e) => setCreateList(e.target.value)}
      />
      <button
        onClick={async () => {
          await fetch("http://localhost:3000/mailingLists", {
            method: "POST",
            body: JSON.stringify({ name: createList }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          fetch("http://localhost:3000/mailingLists")
            .then((res) => res.json())
            .then((data) => setAllMailingLists(data));
        }}
      >
        Create New List
      </button>
      <div style={{ overflowY: "auto" }}>
        {allMailingLists.map((list) => (
          <button
            key={list.id}
            onClick={() => {
              setSelectedList(list);
              console.log(list);
            }}
          >
            {list.name}
            {list.id}
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
                          .then((data) => setAllMailingLists(data));
                      });
                    } else {
                      alert("List not empty");
                    }
                  });
              }}
            >
              Delete
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseLists;
