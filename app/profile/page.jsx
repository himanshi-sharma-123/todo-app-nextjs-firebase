"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Todo from "./todo";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// import { AIOutlinePlus } from "react-icons/ai";

const page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  console.log(input);
  // Create todo from firebase
  const createTodo = async (e) => {
    e.preventDefault(e);
    // if (!user) return;
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => unSubscribe();
  }, []);

  // Update todo from firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo from firebase

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <div>
          <p>Welcome, {user.displayName} - List your preferred task here!!</p>
          <h1>TODO APP</h1>
          <form onSubmit={createTodo}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add todo"
            />
            <button>ADD</button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          <p>{`You have ${todos.length} todos`}</p>
        </div>
      ) : (
        <p>You must be logged in to view this page - protected route</p>
      )}
    </div>
  );
};

export default page;
