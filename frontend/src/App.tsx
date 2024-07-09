import { useState } from "react";
import CreateEmail from "./CreateEmail";
import Dashboard from "./Dashboard";
import ManageList from "./ManageList";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  return (
    <>
      <div
        //set navbar to the left side of the screen always
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <button onClick={() => setCurrentPage("createEmail")}>
            Create Email
          </button>
          <button onClick={() => setCurrentPage("manageList")}>
            Manage List
          </button>
          <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
        </nav>
        {currentPage === "dashboard" ? <Dashboard /> : null}
        {currentPage === "createEmail" ? <CreateEmail /> : null}
        {currentPage === "manageList" ? <ManageList /> : null}
      </div>
    </>
  );
}

export default App;

//default dashboard
//onclick, render different components
