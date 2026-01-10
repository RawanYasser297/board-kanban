import { useContext, useState } from "react";
import { DataContext } from "../dataContext";
import { produce } from "immer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({
  column,
  task,
  taskIndex,
  columnIndex,
}) => {
  const { setData, isSelectedBoard, selectedBoardIndex } =
    useContext(DataContext);
    const [editMode, setEditMode] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleBlur = (e) => {
    setEditMode(false);
    if (e.target.value.trim() === task.content) return;

    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].boardCols[columnIndex].tasks[
          taskIndex
        ].content = e.target.value;
      }),
    );
    setEditMode(true);
  };

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleBlur();
  };

  const handelDelBtn = (taskId, columnId) => {
    setData((prev) => {
      return prev.map((board) => {
        if (board.boardId === isSelectedBoard) {
          return {
            ...board,
            boardCols: board.boardCols.map((col) => {
              if (col.id === columnId) {
                return {
                  ...col,
                  tasks: col.tasks.filter((task) => task.id !== taskId),
                };
              }
              return col;
            }),
          };
        }
        return board;
      });
    });
  };

  return (
    <div
      className="group mb-3 flex w-11/12 flex-row items-start gap-3 rounded-md bg-white p-2  shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {editMode ? (
        <textarea
          className="mb-3 flex-1 px-4 font-medium"
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={task.content}
          autoFocus
          onKeyDown={handleKeyDown}
        ></textarea>
      ) : (
        <button
          onClick={()=>setEditMode(true)}
          className=" h-full w-11/12 flex-1 cursor-pointer px-4 font-medium"
        >
          <span className="text-medium-grey  font-bold space-x-1 ">{!task.content.length && "Empty Task"}</span>
          {task.content}
        </button>
      )}

      <button
        type="button"
        className="text-red opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => handelDelBtn(task.id, column.id)}
      >
        del
      </button>
    </div>
  );
};

export default Task;

/**
 * delete task
 * find the selected column
 * return others columns
 * selectedCols => {id,name,tasks} ✔️
 * tasks => {name,id}
 * one of the tasks is wonted
 * selected columns.tasks.findIndex()
 * after find  index of the specific task
 * splice on tasks array
 * tasks
 *
 */
