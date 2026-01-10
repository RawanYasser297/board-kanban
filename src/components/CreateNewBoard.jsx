import { useContext, useState } from "react";
import Buttons from "./Buttons";
import InputField from "./InputField";
import { DataContext } from "../dataContext";
import { Dialog } from "@radix-ui/themes";

// Crate -Edit new board
const CreateNewBoard = ({ selectedBoard }) => {
  const { setData, setIsSelectedBoard } = useContext(DataContext);

  const [columnsInp, setColumnsInp] = useState(selectedBoard?.boardCols || []);

  const handelAddNewColInput = () => {
    setColumnsInp((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", tasks: [] },
    ]);
  };

  const handelDel = (colId) => {
    setColumnsInp((prev) => prev.filter((col) => col.id !== colId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");

    const boardCols = columnsInp?.map((col, i) => ({
      ...col,
      title: formData.getAll("title")[i],
    }));

    const newBoard = { boardName, boardId: crypto.randomUUID(), boardCols };
    console.log(newBoard);

    if (selectedBoard) {
  setData((prev) =>
    prev.map((board) =>
      board.boardId === selectedBoard.boardId
        ? { ...board, boardName, boardCols }
        : board
    )
  );
  setIsSelectedBoard(selectedBoard.boardId);
} else {
  setData((prev) => [...prev, newBoard]);
  setIsSelectedBoard(newBoard.boardId);
}
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <InputField label="Name" name="boardName" dv={selectedBoard?.boardName} />
      <div>
        <label className="text-heading-m font-semibold text-medium-grey">
          columns
        </label>
        <div className="mt-1">
           {columnsInp?.map((col) => (
          <div className="flex items-center gap-2" key={col.id}>
            <InputField name="title" dv={col?.title} />
            <button
              type="button"
              className="mb-5 h-4"
              onClick={() => handelDel(col.id)}
            >
              <img className="h-full" src="/assets/icon-cross.svg" alt="" />
            </button>
          </div>
        ))}
        </div>
       

        <Buttons
          type="button"
          className="mb-5 mt-[-20px] w-full rounded-full"
          intent="add"
          size="sm"
          onClick={handelAddNewColInput}
        >
          + Add New Column
        </Buttons>
      </div>
      <Dialog.Close>
        <Buttons
          type="submit"
          className="w-full rounded-full"
          intent="primary"
          size="md"
        >
          {selectedBoard ? "Edit Board" : "Create New Board"}
        </Buttons>
      </Dialog.Close>
    </form>
  );
};

export default CreateNewBoard;
