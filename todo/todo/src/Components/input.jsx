import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createTodo } from "./store/slice";
export default function Input() {


  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const todoArray = useSelector((store) => store.todo.todoItems);
  const error = useSelector((store) => store.todo.error);
  const addItem = () => {
    console.log("add item called");
    if (todoName.trim().length === 0) {
      alert("Please Enter something ");
      return;
    }
    setTodoName("");
    dispatch(createTodo(todoName));
  };

  return (
    <div className="flex flex-col items-center gap-[10px]  ">
      <button
        className="border rounded-[5px] px-[10px] bg-yellow-500 text-white  "
        onClick={addItem}
      >
        Add Item
      </button>
      <input
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        type="text"
        className="border border-0 rounded-[10px] h-[30px] w-[300px] text-black px-[5px] font-bold"
        placeholder="Enter Todo"
      />
      {error && <span className="text-white">{error}</span>}
    </div>
  );
}
