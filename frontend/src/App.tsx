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
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: "2rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome to the Email Sender Demo!
          </h1>
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
