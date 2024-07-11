import ManageList from "./ManageList";
import BrowseLists from "./BrowseLists";
import { useState } from "react";

const Dashboard = () => {
  const [selectedList, setSelectedList] = useState(null);
  if (!selectedList) {
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <BrowseLists setSelectedList={setSelectedList}></BrowseLists>
        <div>"No list selected"</div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <BrowseLists setSelectedList={setSelectedList}></BrowseLists>
        <ManageList selectedList={selectedList}></ManageList>
      </div>
    );
  }
};

export default Dashboard;
