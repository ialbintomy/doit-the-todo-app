import React, { useState, useRef, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloudDone } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "./todo.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editID, setEditID] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    if (input.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    if (editID) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editID ? { ...todo, list: input } : todo
      );
      setTodos(updatedTodos);
      setEditID(0);
    } else {
      setTodos([...todos, { list: input, id: Date.now(), status: false }]);
    }
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setInput(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="body">
      <h1>DOIT</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Tell me your plan.."
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={addTodo}>{editID ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div style={{ textDecoration: todo.status ? "line-through" : "none",color:todo.status?'blue':'black',transition:todo.status?'0.5s':'none'}}>
                {todo.list}
              </div>
              <div className="icons">
                <span>
                  <FaEdit title="edit" onClick={() => onEdit(todo.id)} />
                  <IoCloudDone title="done" onClick={() => onComplete(todo.id)} />
                  <MdDelete title="delete" onClick={() => onDelete(todo.id)} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Todo;