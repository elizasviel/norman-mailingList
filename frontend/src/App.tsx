import Dashboard from "./Dashboard";

import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
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
        {/* <UserButton></UserButton> */}
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
