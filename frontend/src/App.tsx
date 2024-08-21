import Dashboard from "./Dashboard";
import { SignedOut, SignedIn, SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#432818",
        height: "100vh",
      }}
    >
      <SignedOut>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <br></br>
          <br></br>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome to the Email Sender Demo!
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Store and manage your mailing lists in one place.
          </p>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              backgroundColor: "#1a1a1a",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <img
              src="/view0.png"
              alt="view0"
              style={{ width: "350px", height: "200px" }}
            />
            <img
              src="/view1.png"
              alt="view1"
              style={{ width: "350px", height: "200px" }}
            />
            <img
              src="/view2.png"
              alt="view2"
              style={{ width: "350px", height: "200px" }}
            />
          </div>
          <br />
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Please sign in to continue
          </p>
          <SignInButton
            mode="modal"
            signUpForceRedirectUrl="https://norman-mailing-list.vercel.app/"
            signUpFallbackRedirectUrl="https://norman-mailing-list.vercel.app/"
            forceRedirectUrl="https://norman-mailing-list.vercel.app/"
            fallbackRedirectUrl="https://norman-mailing-list.vercel.app/"
          >
            <button
              style={{
                backgroundColor: "#f0a500",
                color: "#432818",
                border: "none",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;
