import Dashboard from "./Dashboard";

import { SignedOut, SignedIn, SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <div style={{ backgroundColor: "#432818", height: "100%" }}>
      <SignedOut>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Welcome to the Email Sender App!</h1>
          <p>Please sign in to continue</p>
          <SignInButton></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;

//default dashboard
//onclick, render different components
/*

*/
