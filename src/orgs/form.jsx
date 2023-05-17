"use client";

import React, { useState, useEffect } from "react";
import { TextField } from "../atoms/text_field";
import { TodoList } from "./todo_list";
import axios from "axios";
import io from "socket.io-client";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_TODO } from "../graphql/mutation";
import { GET_ALL_TODOS } from "@/graphql/query";

let socket;

export const Form = ({ todoList }) => {
  const [formData, setFormData] = useState({ name: "", todo: "" });
  const [todos, setTodos] = useState(todoList);

  // const { loading, error, data } = useQuery(GET_ALL_TODOS);
  const [createTodo, { err }] = useMutation(CREATE_TODO);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`form data is: ${formData.name} and ${formData.todo}`);
    try {
      const response = createTodo({
        variables: formData,
      });

      console.log("Todo added successfully");
      // console.log(`response is ${response.data}`);

      // const todosResponse = await data.getAllTodos;

      const newTodo = (await response).data.createTodo; // Get the newly created todo from the response
      console.log("new todo is:", newTodo);

      setTodos((prevTodos) => [...prevTodos, newTodo]);
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
