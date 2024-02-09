import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();

  function openTodoPage() {
    nav("/todos");
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={openTodoPage}>
        Todos
      </button>
    </div>
  );
};

export default Home;
