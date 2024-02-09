import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompletTodo,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const nav = useNavigate();

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error(error));
  }

  function addNewTodo() {
    nav("/add-todo");
  }

  function updateTodo(id) {
    nav(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then((response) => {
        if (response.status == HttpStatusCode.Ok) {
          alert("Todo removed successfully");
          listTodos();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markTodo(completed, id) {
    if (completed) {
      inCompletTodo(id)
        .then((response) => {
          alert("Todo marked incomplete");
          listTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      completeTodo(id)
        .then((response) => {
          alert("Todo marked completed");
          listTodos();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => removeTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => markTodo(todo.completed, todo.id)}
                  >
                    {todo.completed ? "Incomplete" : "Complete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todos;
