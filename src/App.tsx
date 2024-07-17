import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, Todo, toDoState } from "./atom";
import TodoList from "./components/TodoList";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TodoInput = styled.input`
  height: 100%;
  color: white;
  background-color: transparent;
  padding: 10px;
  outline: none;
  border: none;
  border-bottom: 2px solid whitesmoke;
`;

interface Form {
  todo: string;
  category: Todo["category"];
}

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({});

  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onValid = ({ todo }: Form) => {
    setToDos((oldToDos) => [{ todo: todo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
    setValue("todo", "");
  };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <Container>
      <div style={{ marginBottom: "30px" }}>Todo</div>
      <form onSubmit={handleSubmit(onValid)}>
        <div style={{ display: "flex" }}>
          <TodoInput
            type="text"
            {...register("todo", {
              required: "할 일을 입력해주세요.",
            })}
            placeholder="투두리스트 입력"
          ></TodoInput>
          <button style={{ marginLeft: "10px", height: "100%", padding: "10px" }}>Add</button>
        </div>
        <p style={{ color: "whitesmoke", marginBottom: "30px" }}>{errors.todo?.message}</p>
      </form>

      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>

      <TodoList />
    </Container>
  );
}

export default App;
