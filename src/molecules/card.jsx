import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";

export function CardWithForm({todoList}) {

    const [formData, setFormData] = useState({ name: "", todo: "" });
    const [todos, setTodos] = useState(todoList);

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
            window.location.reload();
            setFormData({ name: "", todo: "" });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Card className="w-[350px] sticky top-3">
            <CardHeader>
                <CardTitle>Add Todo</CardTitle>
                <CardDescription>Add your new todo in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="your name"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Todo</Label>
                            <Input
                                id="todo"
                                name="todo"
                                value={formData.todo}
                                onChange={handleInputChange}
                                placeholder="Name of your todo"/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button className={"bg-blue-500 hover:bg-blue-700"}
                        onClick={handleSubmit}>Add Todo</Button>
            </CardFooter>
        </Card>
    )
}
