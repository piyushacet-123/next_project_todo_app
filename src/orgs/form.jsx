"use client";

import React, { useState, useEffect } from "react";
import { TextField } from "../atoms/text_field";
import { TodoList } from "./todo_list";
import axios from "axios";
import io from "socket.io-client";

let socket;

export const Form = ({ todoList }) => {
  const [formData, setFormData] = useState({ name: "", todo: "" });
  const [todos, setTodos] = useState(todoList);
  // const socket = io("http://localhost:4000");

  useEffect(() => {
    (async () => {
      // socket = io(`http://${process.env.NEXT_PUBLIC_API_URL}`);

      // socket.on("connect", () => {
      //   // setIsConnected(true)
      //   console.log("connected");
      // });

      // socket.on("disconnect", () => {
      //   // setIsConnected(false)
      //   console.log("disconnected");
      // });

      // socket.on("newTodo", (data) => {
      //   console.log("New todo received:", data);
      //   setTodos((prevTodos) => [...prevTodos, data]);
      // });

      socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_API_URL}`);

      socket.onopen = () => {
        console.log("connected");
      };

      socket.onclose = () => {
        console.log("disconnected");
      };

      socket.onmessage = (event) => {
        console.log(event);

        // const reader = new FileReader();

        // reader.onload = function () {
        //   console.log("reader", reader.result);
        //   console.log("New todo received:", reader.result);
        //   setTodos((prevTodos) => [...prevTodos, reader.result]);
        // };

        // reader.readAsText(event.data);

        console.log("New todo received:", event.data, typeof event.data);
        setTodos((prevTodos) => [...prevTodos, JSON.parse(event.data)]);
      };
    })();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`form data is: ${formData.name} and ${formData.todo}`);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/add-todo`,
        formData
      );

      console.log("Todo added successfully");

      // const todosResponse = await axios.get(
      //   "http://192.168.0.203:4000/todo/list-todos"
      // );
      // console.log(`todos list are: ${todosResponse}`);
      // setTodos(todosResponse.data);
      setFormData({ name: "", todo: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto flex px-10">
      <div>
        <div className="py-4 font-bold">Please fill details for add todo</div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <TextField
            title={"name"}
            name={"name"}
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            title={"Todo"}
            name={"todo"}
            value={formData.todo}
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-between">
            <button
              // onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add to-do
            </button>
          </div>
        </form>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};
