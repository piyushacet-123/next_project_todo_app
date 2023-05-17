import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = () => {
  const [data, setData] = useState(null);

  useEffect((q) => {
    async () => {
      const todosResponse = await axios.get(
        "http://localhost:5000/todo/list-todos"
      );
      setData(todosResponse)
    };
  }, []);
  return data;
};
