import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation createTodo($name: String, $todo: String) {
    createTodo(todo: { name: $name, todo: $todo }) {
      name
      todo
    }
  }
`;
