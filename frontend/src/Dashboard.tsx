import ManageList from "./ManageList";
import BrowseLists from "./BrowseLists";
import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import CreateEmail from "./CreateEmail";

interface MailingList {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState<MailingList | null>(null);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#99582A",
      }}
    >
      <BrowseLists setSelectedList={setSelectedList} />
      {!selectedList ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFF",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome to Your Dashboard
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Please select a list to get started
          </p>
        </div>
      ) : (
        <>
          <ManageList selectedList={selectedList} />
          <CreateEmail />
        </>
      )}
      <div style={{ padding: "20px" }}>
        <UserButton />
      </div>
    </div>
  );
};

export default Dashboard;
