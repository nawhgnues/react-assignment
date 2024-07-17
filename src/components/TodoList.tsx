import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atom";
import ToDo from "./Todo";

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <div>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default TodoList;
