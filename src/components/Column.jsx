import { useContext, useState } from "react";
import Task from "./Task";
import { DataContext } from "../dataContext";
import { produce } from "immer";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ column, index, tasksIds }) => {
  const { data, setData, isSelectedBoard, selectedBoardIndex } =
    useContext(DataContext);
  

  const { setNodeRef } = useDroppable({
    id: column.id, // مهم جدًا
    data: {
      type: "COLUMN",
    },
  });

  const addNewTask = () => {
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex]?.boardCols[index].tasks.push({
          id: crypto.randomUUID(),
          content: "",
        });
      }),
    );
  };

  const handelDelCol = (id) => {
    if (window.confirm("Delete this column")) {
      setData((prev) =>
        produce(prev, (draft) => {
          const findSelectedBoard = draft.findIndex(
            (board) => board.boardId === isSelectedBoard,
          );
          draft[findSelectedBoard].boardCols = draft[
            findSelectedBoard
          ].boardCols.filter((col) => col.id !== id);
        }),
      );
    }
  };

  return (
    <div  className="group/col relative h-fit w-72 min-w-72 rounded-xl bg-light-grey pt-5 shadow-md" ref={setNodeRef}>
      <h3 className="mb-3 h-7 px-4 font-medium">
        {column.title}{" "}
        <span>
          ({(column.tasks.length - 1 < 0) ? 0 : column.tasks.length})
        </span>
      </h3>
      <button
        type="button"
        className="absolute left-3/4 top-5 text-red opacity-0 transition-opacity group-hover/col:opacity-100"
        onClick={() => handelDelCol(column.id)}
      >
        delete
      </button>
      <div className="px-4">
        <SortableContext id={column.id} items={tasksIds}>
          {data[selectedBoardIndex]?.boardCols[index].tasks.map((task, i) => (
            <Task
              key={task.id}
              column={column}
              task={task}
              taskIndex={i}
              columnIndex={index}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="w-full border-t-[1px] border-y-white px-4 py-3 font-semibold text-medium-grey"
        onClick={addNewTask}
      >
        {" "}
        + Add New Task
      </button>
    </div>
  );
};

export default Column;
