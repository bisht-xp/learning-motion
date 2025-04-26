"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, X } from "lucide-react";

const DragAndDropTodo = () => {
  const [todos, setTodos] = useState([
    { id: "1", text: "Research competitors", completed: false },
    { id: "2", text: "Define product requirements", completed: false },
    { id: "3", text: "Create wireframes", completed: false },
    { id: "4", text: "Develop prototype", completed: false },
    { id: "5", text: "Test with users", completed: false },
  ]);

  // Track which item is being dragged
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Track the initial grab offset (where on the item the user clicked)
  const [grabOffset, setGrabOffset] = useState(0);

  // Toggle between the two drag behaviors
  const [dragMode, setDragMode] = useState("progressive"); // or "swap"

  // Reference to the list container
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle completion status
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle drag start - capture the initial grab position
  const handleDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: any,
    todoId: string
  ) => {
    setDraggedItemId(todoId);

    if (!listRef.current) return;

    // Find the DOM element being dragged
    const itemIndex = todos.findIndex((todo) => todo.id === todoId);
    if (itemIndex === -1) return;

    const itemElement = listRef.current.children[itemIndex];
    if (!itemElement) return;

    // Calculate where on the item the user clicked (relative to item's top)
    const itemRect = itemElement.getBoundingClientRect();
    const grabOffsetY = info.point.y - itemRect.top;
    console.log("Item top:", itemRect.top, "Pointer Y:", info.point.y);
    console.log("Item height:", itemRect.height);
    console.log("grabOffset: ", grabOffsetY);

    setGrabOffset(grabOffsetY);
  };

  // SCENARIO 1: Progressive reordering during drag
  const handleProgressiveDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: any,
    todoId: string
  ) => {
    if (!listRef.current) return;

    // Get current position of the dragged item in the array
    const currentIndex = todos.findIndex((todo) => todo.id === todoId);
    if (currentIndex === -1) return;

    // Calculate which position the pointer is hovering over
    const listRect = listRef.current.getBoundingClientRect();
    const itemHeight = listRef.current.children[0]?.clientHeight || 60;

    console.log("itemHeight: ", itemHeight);

    // Adjust the relative Y position by subtracting the grab offset
    // This gives us the position of the item's top edge, not the cursor
    const relativeY = info.point.y - listRect.top - grabOffset;

    // Calculate the center point of the dragged item
    const itemCenterY = relativeY + itemHeight / 2;
    console.log("relativePositon and center: ", relativeY, itemCenterY);

    // Find the target index based on the item's center position
    let targetIndex = Math.floor(itemCenterY / itemHeight);
    targetIndex = Math.max(0, Math.min(targetIndex, todos.length - 1));

    console.log("targetIndex: ", targetIndex);

    // Only reorder if the target is different from current position
    if (currentIndex !== targetIndex) {
      // Create a new array with reordered items
      const newTodos = [...todos];
      const [draggedItem] = newTodos.splice(currentIndex, 1);
      newTodos.splice(targetIndex, 0, draggedItem);
      setTodos(newTodos);
    }
  };

  // SCENARIO 2: Direct swap on drop
  const handleSwapOnDrop = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: any,
    todoId: string
  ) => {
    // Find the position of the dragged item
    const draggedIndex = todos.findIndex((todo) => todo.id === todoId);
    if (draggedIndex === -1 || !listRef.current) return;

    // Calculate which item we dropped on, accounting for grab offset
    const listRect = listRef.current.getBoundingClientRect();
    const itemHeight = listRef.current.children[0]?.clientHeight || 60;

    // Adjust the relative Y position by subtracting the grab offset
    const relativeY = info.point.y - listRect.top - grabOffset;

    // Calculate the center point of the dragged item
    const itemCenterY = relativeY + itemHeight / 2;

    // Find the target index based on the item's center position
    const dropTargetIndex = Math.max(
      0,
      Math.min(Math.floor(itemCenterY / itemHeight), todos.length - 1)
    );

    // If we dropped on a different item, swap them
    if (draggedIndex !== dropTargetIndex) {
      const newTodos = [...todos];

      // Simple swap implementation
      const temp = newTodos[draggedIndex];
      newTodos[draggedIndex] = newTodos[dropTargetIndex];
      newTodos[dropTargetIndex] = temp;

      setTodos(newTodos);
    }

    // Clear dragged item state and grab offset
    setDraggedItemId(null);
    setGrabOffset(0);
  };

  return (
    //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Drag & Drop Todo List
      </h1>

      {/* Mode selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setDragMode("progressive")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              dragMode === "progressive"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Progressive Reordering
          </button>
          <button
            type="button"
            onClick={() => setDragMode("swap")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              dragMode === "swap"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Swap on Drop
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4 text-center">
        Current mode:{" "}
        {dragMode === "progressive"
          ? "Items shift as you drag"
          : "Items swap positions when dropped"}
      </div>

      {/* Todo list container */}
      <div ref={listRef} className="space-y-2"  >
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              layoutId={todo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow:
                  draggedItemId === todo.id
                    ? "0px 8px 20px rgba(0,0,0,0.2)"
                    : "0px 1px 3px rgba(0,0,0,0.1)",
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
                opacity: { duration: 0.2 },
              }}
              className={`bg-white border rounded-lg p-3 flex items-center gap-2 ${
                draggedItemId === todo.id ? "z-10" : ""
              }`}
              style={{
                position: "relative",
                backgroundColor:
                  draggedItemId === todo.id ? "#f9fafb" : "white",
              }}
            >
              {/* Drag handle */}
              <motion.div
                className="cursor-grab touch-none"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragStart={(e, info) => handleDragStart(e, info, todo.id)}
                onDrag={(e, info) => {
                  if (dragMode === "progressive") {
                    handleProgressiveDrag(e, info, todo.id);
                  }
                }}
                onDragEnd={(e, info) => {
                  if (dragMode === "swap") {
                    handleSwapOnDrop(e, info, todo.id);
                  } else {
                    setDraggedItemId(null);
                    setGrabOffset(0);
                  }
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                <GripVertical size={20} className="text-gray-400" />
              </motion.div>

              {/* Todo content */}
              <div className="flex items-center flex-1 gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    // </div>l̥
  );
};

export default DragAndDropTodo;
