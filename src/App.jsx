import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Workspace from "./layout/Workspace";
import { useEffect, useState } from "react";
import { DataContext } from "./dataContext";
// In your application's entrypoint
import { enableMapSet } from "immer";

enableMapSet();

function App() {
  const [isSelectedBoard, setIsSelectedBoard] = useState("");
  //const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
  const [data, setData] = useState([]);

  const selectedBoardIndex = data.findIndex(
  (board) => board.boardId === isSelectedBoard
);
const safeIndex = selectedBoardIndex === -1 ? 0 : selectedBoardIndex;

  useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("Boards"));

  if (savedData?.length) {
    setData(savedData);
    setIsSelectedBoard(savedData[0].boardId);
  }
}, []);



  useEffect(() => {
    if (!data.length) return;
    localStorage.setItem("Boards", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider
  value={{
    data,
    setData,
    isSelectedBoard,
    setIsSelectedBoard,
    selectedBoardIndex: safeIndex,
  }}
>

      <Header />
      <Sidebar
        boards={data.map((board) => ({
          name: board.boardName,
          id: board.boardId,
        }))}
      />
      <Workspace />
    </DataContext.Provider>
  );
}

export default App;
