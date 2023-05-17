import { Form } from "../orgs/form";
import { Header } from "../orgs/header";
import axios from "axios";
import Head from "next/head";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TODOS } from "../graphql/query";

let socket;

const Page = ({ todos }) => {
  return (
    <div>
      <Head>
        <title>Todo Page</title>
        <meta name="description" content="Todos data" />
      </Head>
      <div>
        <Header />
        <Form todoList={todos} />
      </div>
    </div>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({ query: GET_ALL_TODOS });
    console.log(`data is: ${data.getAllTodos}`)
    const todos = data.getAllTodos || []; // Set todos to an empty array if it is undefined

    return { props: { todos } };
  } catch (error) {
    console.error("Error fetching todos", error);
    return { props: { todos: [] } }; // Return an empty array as a fallback
  }
}

// export async function getServerSideProps() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/todo/list-todos`
//   );

//   return { props: { todos: data } };
// }
