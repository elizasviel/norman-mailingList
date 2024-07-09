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
    <div>
      <SignedOut>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>Welcome to the Email Sender App!</h1>
          <p>Please sign in to continue</p>
          <SignInButton></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div style={{ display: "flex", flexDirection: "row", height: "97vh" }}>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "10px",
            }}
          >
            <button
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <UserButton></UserButton> Profile
            </button>
            <button onClick={() => setCurrentPage("createEmail")}>
              Create Email
            </button>
            <button onClick={() => setCurrentPage("manageList")}>
              Manage List
            </button>
            <button onClick={() => setCurrentPage("dashboard")}>
              Dashboard
            </button>
          </nav>
          <div style={{ paddingLeft: "40px" }}>
            {currentPage === "dashboard" ? <Dashboard /> : null}
            {currentPage === "createEmail" ? <CreateEmail /> : null}
            {currentPage === "manageList" ? <ManageList /> : null}
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;

//default dashboard
//onclick, render different components
/*

*/
