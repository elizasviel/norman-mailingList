import { useEffect, useState } from "react";

const emailChecker = new RegExp("^.+@.+\\..+$");

//^ and $ are start and end of string
//.+ matches 1 or more characters
//@ matches the @ symbol
//\\. matches the dot, slashes escape the dot

const ManageList = () => {
  const [recipients, setRecipients] = useState<
    { firstname: string; lastname: string; email: string; id: number }[]
  >([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/mailingLists/1")
      .then((res) => res.json())
      .then((data) => setRecipients(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Manage List</h1>
      <div style={{ overflowY: "scroll", height: "72vh" }}>
        {recipients.map((recipient, index) => (
          <div key={index}>
            <p>
              {recipient.firstname} {recipient.lastname} {recipient.email}
              <button
                onClick={async () => {
                  await fetch(
                    `http://localhost:3000/mailingLists/1/${recipient.id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  fetch("http://localhost:3000/mailingLists/1")
                    .then((res) => res.json())
                    .then((data) => setRecipients(data))
                    .then(() => {
                      console.log("fetched");
                    });
                }}
              >
                x
              </button>
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
          onClick={async () => {
            if (!emailChecker.test(email)) {
              alert("Invalid email");
              return;
            }
            await fetch("http://localhost:3000/mailingLists/1/add", {
              method: "POST",
              body: JSON.stringify({ firstname, lastname, email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            fetch("http://localhost:3000/mailingLists/1")
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
