import ManageList from "./ManageList";
import BrowseLists from "./BrowseLists";
import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState(null);
  if (!selectedList) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "pink",
        }}
      >
        <BrowseLists setSelectedList={setSelectedList}></BrowseLists>
        <div
          style={{
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          "No list selected"
        </div>
        <div style={{ marginLeft: "auto" }}>
          <UserButton></UserButton>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "pink",
        }}
      >
        <BrowseLists setSelectedList={setSelectedList}></BrowseLists>
        <ManageList selectedList={selectedList}></ManageList>
        <div style={{ marginLeft: "auto" }}>
          <UserButton></UserButton>
        </div>
      </div>
    );
  }
};

export default Dashboard;
