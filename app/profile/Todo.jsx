import React from "react";

const style = {
  li: `flex justify-between bg-slate-800 p-4 my-2 capitalize text-black`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize text-black`,
  row: `flex`,
  text: `ml-2 cursor-pointer text-black`,
  textComplete: `ml-2 cursor-pointer line-through text-black`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default Todo;
