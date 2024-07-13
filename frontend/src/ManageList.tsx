import { useState, useEffect } from "react";

const ManageList = ({ selectedList }: { selectedList: any }) => {
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
        <div
          style={{
            border: "0.1px solid #858585",
            borderRadius: "2px",
            display: "flex",
            flexDirection: "row",
            color: "#FFE6A7",
            paddingBottom: "3px",
            paddingTop: "3px",
            backgroundColor: "#432818",
          }}
        >
          <div style={{ width: "31.5%" }}>First Name</div>
          <div style={{ width: "31%" }}>Last Name</div>
          <div>Email</div>
        </div>
        {recipients.map((recipient: any, index: any) => (
          <div
            key={index}
            style={{
              border: "0.1px solid #858585",
              borderRadius: "2px",
              backgroundColor: "#484848",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "27px",
            }}
          >
            <td style={{ width: "33%", paddingLeft: "4px" }}>
              {recipient.firstname}
            </td>
            <td style={{ width: "33%" }}>{recipient.lastname}</td>
            <td style={{ width: "33%" }}>{recipient.email}</td>

            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0px",
                color: "white",
                height: "100%",
                width: "6%",
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
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
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
    </div>
  );
};

export default ManageList;
