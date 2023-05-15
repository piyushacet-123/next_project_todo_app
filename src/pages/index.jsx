import Image from "next/image";
import { Form } from "../orgs/form";
import { Header } from "../orgs/header";
import Link from "next/link";
import { TodoList } from "../orgs/todo_list";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Page = ({ todos }) => {
  // const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   async function socketInitializer() {

  //     socket = io('http://localhost:4000');

  //     socket.on('connect', () => {
  //       setIsConnected(true)
  //       console.log('connected');
  //     });

  //     socket.on('disconnect', () => {
  //       setIsConnected(false)
  //       console.log('disconnected');
  //     });
  //     // await fetch("/api/socket");
  //     // socket = io();

  //     // socket.on("connect", () => {
  //     //   console.log("connected");
  //     // });
  //   }
  //   socketInitializer();
  // }, []);

  return (
    <div>
      <Head>
        <title>Todo Page</title>
        <meta name="description" content="Todos data" />
      </Head>
      <div>
        <Header />
        {/* <p>socket is connected : {JSON.stringify(isConnected)}</p> */}
        <Form todoList={todos} />
        {/* <TodoList /> */}
      </div>
    </div>
  );
};

export default Page;

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/todo/list-todos`
  );

  return { props: { todos: data } };
}
