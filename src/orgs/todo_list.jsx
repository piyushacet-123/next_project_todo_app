import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


export const TodoList = ({ todos }) => {

    const handleDelete = async (todoId) => {
        try {
            console.log("todoId", todoId);
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/delete-todo/${todoId}`
            );
            console.log("Todo deleted successfully");
            window.location.reload();
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }

  return (
    <div className="w-[350px] mx-auto">
      <div className="py-4 text-3xl font-bold">List of todos:</div>
        {
            todos.length === 0 ? <div className={"text-lg"}>No todos yet</div> :
                <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {todos.map((todo, index) => (
                        <li key={index} className="mb-2 border-b border-gray-200">
                            <div className="flex justify-between">
                                <div>
                                    <div className="font-bold">{todo.name}</div>
                                    <div className="text-gray-500">{todo.todo}</div>
                                </div>
                                <MdDelete color={"bg-red-500"} size={24} onClick={() => handleDelete(todo.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
        }
    </div>
  );
};

export const ListOfTodos = ({ todos }) => {

    const handleDelete = async (todoId) => {
        try {
            console.log("todoId", todoId);
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/delete-todo/${todoId}`
            );
            console.log("Todo deleted successfully");
            window.location.reload();
        } catch (error) {
            console.log("here");
            console.error(error);
        }
    }

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>List of todos</CardTitle>
                <CardDescription>Below is the list of your todos.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    todos.length === 0 ? <div className={"text-lg text-center text-gray-500"}>You have not added any todos yet</div> :
                        <ul className="flex flex-col gap-6">
                            {todos.map((todo, index) => (
                                <li key={index} className="border-b pb-2 border-gray-200">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="font-bold">{todo.name}</div>
                                            <div className="text-gray-500">{todo.todo}</div>
                                        </div>
                                        <MdDelete className={"cursor-pointer"} color={"bg-red-500"} size={24} onClick={() => handleDelete(todo.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                }
            </CardContent>
            <CardFooter className="flex justify-between">
                {/*<Button className={"bg-blue-500 hover:bg-blue-700"}*/}
                {/*        onClick={handleSubmit}>Add Todo</Button>*/}
            </CardFooter>
        </Card>
    )
}
