import { useState, useEffect } from "react";

const ManageList = ({ selectedList }: { selectedList: any }) => {
  console.log(selectedList);
  const emailChecker = new RegExp("^.+@.+\\..+$");
  //^ and $ are start and end of string
  //.+ matches 1 or more characters
  //@ matches the @ symbol
  //\\. matches the dot, slashes escape the dot
  const [recipients, setRecipients] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("hit");
    fetch(`http://localhost:3000/mailingLists/${selectedList.id}`)
      .then((res) => res.json())
      .then((data) => setRecipients(data));
  }, [selectedList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <h1 style={{ color: "#FFE6A7" }}>{selectedList.name}</h1>
      <div style={{ overflowY: "scroll" }}>
        {recipients.map((recipient: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              justifyItems: "center",
              backgroundColor: "#BB9457",
              height: "27px",
            }}
          >
            <p style={{ color: "black", marginLeft: "10px" }}>
              {recipient.firstname} {recipient.lastname} {recipient.email}
            </p>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                height: "2px",
                width: "2px",
              }}
              onClick={async () => {
                await fetch(
                  `http://localhost:3000/mailingLists/${selectedList.id}/${recipient.id}`,
                  {
                    method: "DELETE",
                  }
                );
                fetch(`http://localhost:3000/mailingLists/${selectedList.id}`)
                  .then((res) => res.json())
                  .then((data) => setRecipients(data))
                  .then(() => {
                    console.log("fetched");
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
          marginTop: "auto",
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "darkgreen",
            color: "#FFE6A7",
          }}
          onClick={async () => {
            console.log(selectedList);
            if (!emailChecker.test(email)) {
              alert("Invalid email");
              return;
            }
            await fetch(
              `http://localhost:3000/mailingLists/${selectedList.id}/add`,
              {
                method: "POST",
                body: JSON.stringify({ firstname, lastname, email }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            fetch(`http://localhost:3000/mailingLists/${selectedList.id}`)
              .then((res) => res.json())
              .then((data) => setRecipients(data))
              .then(() => {
                console.log("fetched");
              });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ManageList;
