import { DropdownMenu } from "@radix-ui/themes";
import { useContext, useEffect} from "react";
import { DataContext } from "../dataContext";
import DialogModel from "./DialogModel";
import CreateNewBoard from "./CreateNewBoard";

const Dropdown = () => {
  const { data, setData, isSelectedBoard,setIsSelectedBoard } = useContext(DataContext);

  const handelDelBtn = () => {
  setData((prev) => {
    const index = prev.findIndex(
      (board) => board.boardId === isSelectedBoard
    );

    if (index === -1) return prev;

    return prev.toSpliced(index, 1);
  });
};

  useEffect(() => {
  if (!data.length) {
    setIsSelectedBoard(null);
    return;
  }

  if (!data.some((b) => b.boardId === isSelectedBoard)) {
    setIsSelectedBoard(data[data.length - 1].boardId);
  }
}, [data, isSelectedBoard]);


  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer">
        <img
          className="w-1.5"
          src="/assets/icon-vertical-ellipsis.svg"
          alt=""
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DialogModel
          dialog={{
            name: "Edit Current Board",
            title: "Edit Current Board",
          }}
        >
          {/* edit board */}
          <CreateNewBoard
            selectedBoard={data.find(
              (board) => board.boardId === isSelectedBoard,
            )}
          />
        </DialogModel>

        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handelDelBtn} color="red">
          delete Current Board
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
