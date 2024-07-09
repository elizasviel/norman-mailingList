import { useEffect, useState } from "react";

const ManageList = () => {
  const [users, setUsers] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Manage List</h1>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <p>
              {user.firstname} {user.lastname} {user.email}
              <button
                onClick={async () => {
                  await fetch(`http://localhost:3000/users/${user.id}`, {
                    method: "DELETE",
                  });
                  fetch("http://localhost:3000/users")
                    .then((res) => res.json())
                    .then((data) => setUsers(data))
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
            await fetch("http://localhost:3000/users", {
              method: "POST",
              body: JSON.stringify({ firstname, lastname, email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            fetch("http://localhost:3000/users")
              .then((res) => res.json())
              .then((data) => setUsers(data))
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
