import { useState, useEffect } from "react";
import ManageList from "./ManageList";
import BrowseLists from "./BrowseLists";

const Dashboard = () => {
  const [recentlySent, setRecentlySent] = useState([]);

  const [selectedList, setSelectedList] = useState({});
  const [newListName, setNewListName] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "80vh" }}>
      <BrowseLists setSelectedList={setSelectedList}></BrowseLists>
      <ManageList
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      ></ManageList>
    </div>
  );
};

export default Dashboard;
