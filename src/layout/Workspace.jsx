import React, { useContext, useEffect, useMemo } from "react";
import Column from "../components/column";
import { DataContext } from "./../dataContext";
import { arrayMove } from "@dnd-kit/sortable";
import { produce } from "immer";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const Workspace = () => {
  
  const { data, setData, isSelectedBoard, selectedBoardIndex } =
    useContext(DataContext);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainerId = active.data.current?.sortable.containerId;
    const overContainerId = over.data.current?.sortable.containerId;

    setData((prev) =>
      produce(prev, (draft) => {
        if (activeContainerId !== overContainerId) return;

        const column = draft[selectedBoardIndex].boardCols.find(
          (col) => col.id === activeContainerId,
        );
        if (!column) return;

        const oldIndex = column.tasks.findIndex((task) => task.id === activeId);
        const newIndex = column.tasks.findIndex((task) => task.id === overId);

        if (oldIndex === -1 || newIndex === -1) return;

        column.tasks = arrayMove(column.tasks, oldIndex, newIndex);
      }),
    );
  };

  const handleCreateNewCol = () => {
    setData((prev) =>
      prev.map((board) =>
        board.boardId === isSelectedBoard
          ? {
              ...board,
              boardCols: [
                ...board.boardCols,
                { id: crypto.randomUUID(), title: "", tasks: [] },
              ],
            }
          : board,
      ),
    );
  };

 const handelDragOver = ({ active, over }) => {
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  const activeContainerId =
    active.data.current?.sortable?.containerId;


  const overContainerId =
    over.data.current?.sortable?.containerId || over.id;

  if (activeContainerId === overContainerId) return;

  setData((prev) =>
    produce(prev, (draft) => {
      const board = draft[selectedBoardIndex];

      const fromCol = board.boardCols.find(
        (col) => col.id === activeContainerId
      );
      const toCol = board.boardCols.find(
        (col) => col.id === overContainerId
      );

      if (!fromCol || !toCol) return;

      const taskIndex = fromCol.tasks.findIndex(
        (task) => task.id === activeId
      );

      if (taskIndex === -1) return;

      const [task] = fromCol.tasks.splice(taskIndex, 1);
      toCol.tasks.push(task);
    })
  );
};



  

  const tasksIds = useMemo(() => {
    // Safely get the columns, defaulting to an empty array if anything is missing
    const cols = data[selectedBoardIndex]?.boardCols || [];

    // Use flatMap to map each column's tasks into IDs and flatten the result
    return cols.flatMap((col) => col.tasks.map((task) => task.id));
  }, [data, selectedBoardIndex]); // IMPORTANT: Include 'data' dependency

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handelDragOver}
      autoScroll
    >
      <div className="ml-[25%]  flex h-full w-[70%] items-start gap-5  pl-4 pt-4 overflow-x-auto scrollbar-hide">
        {data[selectedBoardIndex]?.boardCols?.map((column, i) => (
          <Column
            column={column}
            index={i}
            key={column.id}
            tasksIds={tasksIds}
          />
        ))}

        <button
          className="min-w-72 rounded-lg bg-light-grey px-4 py-4 font-semibold text-lines shadow-md"
          onClick={handleCreateNewCol}
        >
          + Add New Column
        </button>
      </div>
    </DndContext>
  );
};

export default Workspace;
