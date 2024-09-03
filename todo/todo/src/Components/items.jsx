import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./store/slice";
export default function TodoItems() {
  const todoArray = useSelector((store) => store.todo.todoItems);
  const status = useSelector((store) => store.todo.getItemsStatus);
  const error = useSelector((store) => store.todo.error);
  let display = "No Task Present!";
  const dispatch = useDispatch();

  if (status === "loading") {
    display = "LOADING DATA";
  } else if (status === "failed") {
    display = error;
  } else if (status === "idle" && todoArray.length > 0) {
    display = todoArray.map((item) => {
      return (
        <li key={item._id} className="flex justify-between">
          <span className="capitalize">{item.todoName}</span>

          <button
            className="border rounded-[5px] px-[10px] bg-yellow-500 text-white "
            onClick={() => {
              dispatch(deleteTodo(item._id));
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div className="py-[15px] px-[15px]">
      <ul className=" text-yellow-500 flex flex-col gap-[10px]">{display}</ul>
    </div>
  );
}
