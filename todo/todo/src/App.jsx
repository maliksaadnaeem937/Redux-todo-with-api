import Container from "./Components/container";
import Input from "./Components/input";
import TodoItems from "./Components/items";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTodos } from "./Components/store/slice";
import { useEffect } from "react";
export default function App() {
 
  const dispatch=useDispatch();
  
  useEffect(() => {
    console.log("uee effect running")
    dispatch(getTodos());
  }, []);
  return (
    <div className="min-h-screen bg-blue-950  ">
      <Container>
        <Input></Input>
        <TodoItems></TodoItems>
      </Container>
    </div>
  );
}
