import clsx from "clsx";
import CreateNewBoard from "../components/CreateNewBoard";
import { useContext } from "react";
import { DataContext } from "../dataContext";
import DialogModel from "./../components/DialogModel";

const Sidebar = ({ boards }) => {
  const { isSelectedBoard, setIsSelectedBoard, setSelectedBoardIndex } =
    useContext(DataContext);
  const handelSelectedBoard = (boardID, index) => {
    setIsSelectedBoard(boardID);
    setSelectedBoardIndex(index);
  };
  return (
    <aside className="absolute left-0 top-0 z-10 h-[100vh] w-[25%] border-r-[1.5px] border-b-medium-grey bg-white">
      <h1 className="ml-5 flex h-[100px] w-fit items-center text-heading-xl">
        Kanban
      </h1>
      <div className="">
        <h3 className="mb-4 ml-5 font-semibold">
          All Boards ({boards.length})
        </h3>
        <ul className="mb-3">
          {boards.map((board, index) => (
            <li
              key={board.id}
              className={clsx(
                "mb-2 flex h-10 w-[90%] cursor-pointer items-center rounded-r-3xl font-medium data-[is-active=false]:hover:bg-main-purple-hover",
                {
                  "bg-main-purple text-white": board.id === isSelectedBoard,
                },
              )}
              data-is-active={board.id === isSelectedBoard}
            >
              <img className="ml-5 h-fit" src="/assets/icon-board.svg" alt="" />
              <button
                className="ml-3 flex h-full flex-1 items-center text-body-l"
                onClick={() => handelSelectedBoard(board.id, index)}
              >
                {board.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex w-full items-center">
          <img className="ml-5 h-fit" src="/assets/icon-board.svg" alt="" />
          <DialogModel
            dialog={{
              name: "+ Create New Board",
              style:
                "text-main-purple font-medium bg-transparent cursor-pointer font-semibold",
              title: "Create New Board",
            }}
          >
            <CreateNewBoard />
          </DialogModel>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
