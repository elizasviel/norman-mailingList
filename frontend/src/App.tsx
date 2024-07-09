import "./App.css";
import CreateEmail from "./CreateEmail";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ManageList from "./ManageList";

function App() {
  return (
    <>
      <nav>
        <CreateEmail />
        <Dashboard />
        <Login />
        <ManageList />
      </nav>
    </>
  );
}

export default App;
