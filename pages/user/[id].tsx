import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { TodoItem } from "@/components/todoItem";
import { todo as todoInterface } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const { id: userId } = router.query;

  const { mutate } = useSWRConfig();
  const {
    data: todos,
    error,
  }: {
    data?: todoInterface[];
    error?: any;
  } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
    fetcher
  );

  useEffect(() => {
    if (userId) console.log({ userId });
    if (todos) console.log({ todos });
    if (error) console.log({ error });
  }, [todos, error, userId]);

  const [inputValue, setInputValue] = useState("");

  // I'd reach for a form lib if we needed something more complex.
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // this will prevent us from adding an empty todo
    if (!e.target.todoInput.value) return;
    addTodo(e.target.todoInput.value);

    //clear input after adding the item
    setInputValue("");
  };

  const addTodo = (title: string) => {
    let newTodo: todoInterface = {
      title: title,
      // id starts from 1 in the api, so we need to +1 to length
      id: todos.length + 1,
      completed: false,
      userId: parseInt(userId as string),
    };
    let tempTodos = [...todos, newTodo];

    // We're not updating the backend but this could also be used if we were. I'm mutating the data locally and the "false" as the third argument makes swr stop trying to revalidate the data from the source. If we wanted to update the data on the backend we would send a POST request after this and call revalidate again. see: https://swr.vercel.app/docs/mutation#mutation-and-post-request
    mutate(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
      tempTodos,
      false
    );
  };

  return (
    <>
      <Head>
        <title>user {userId}'s Todo</title>
      </Head>
      <header>
        <nav>
          <Link href="/" passHref>
            <a>Back home</a>
          </Link>
        </nav>
      </header>
      <main>
        <ul>
          {todos &&
            todos.map((todo, i) => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            required
            id="todoInput"
            name="todoInput"
            placeholder="New todo"
            value={inputValue}
            onChange={handleInputChange}
            type="text"
          />
          <button type="submit">Add</button>
        </form>
      </main>
    </>
  );
}
