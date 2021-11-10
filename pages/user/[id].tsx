import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { TodoItem } from "@/components/todoItem";
import { todo as todoInterface } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const { id: userId } = router.query;

  const {
    data,
    error,
  }: {
    data?: todoInterface[];
    error?: any;
  } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
    fetcher
  );

  // Since we're not sending the todos we create to the API, we need to create a copy of the data to use and modify so swr doesn't override it trying to revalidate from the server. see the comment at addTodo(), if we were implementing the method of mutating+requesting described there, this section would be unnecessary.
  const [todos, setTodos] = useState([]);
  const getTodosFromAPI = useCallback((newTodos) => {
    setTodos((prev) => [...prev, ...newTodos]);
  }, []);
  useEffect(() => {
    if (data && data.length > 0) getTodosFromAPI(data);
  }, [data]);

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
      // id starts from 1 in the api, so we need to +1 to length. Ideally we would use something like a uuid
      id: todos.length + 1,
      completed: false,
      userId: parseInt(userId as string),
    };
    let tempTodos = [...todos, newTodo];

    // We're not updating the backend if we were we could use mutate() directly on the data object instead of having a separate state. by the data locally and passing "false" as the third argument swr would stop trying to revalidate the data from the source. If we wanted to update the data on the backend we would send a POST request after the mutate() and call revalidate again. see: https://swr.vercel.app/docs/mutation#mutation-and-post-request
    setTodos(tempTodos);
  };

  return (
    <>
      <Head>
        <title>user {userId}'s Todos</title>
      </Head>
      <header className="sticky top-0 p-4 bg-mauve3 border-b border-mauve5">
        <nav>
          <Link href="/" passHref>
            <a className="hover:text-crimson9 focus:ring-0 focus:ring-offset-0 focus:text-crimson10 transition-colors">
              Back home
            </a>
          </Link>
        </nav>
      </header>
      {error && <div>The api threw this error: {error}</div>}
      <main className="p-4 md:p-8 max-w-2xl mx-auto">
        <ul className="">
          {todos &&
            todos.map((todo, i) => (
              <li>
                <TodoItem key={todo.id} todo={todo} />{" "}
                {i < todos.length - 1 && (
                  <hr className="border-t border-mauve6" />
                )}
              </li>
            ))}
        </ul>
        <form
          className="flex flex-row-reverse p-2 gap-2"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full py-1 px-2 border-b-2 border-mauve7 focus:ring-0 focus:border-crimson10 transition-colors"
            required
            id="todoInput"
            name="todoInput"
            placeholder="New todo"
            value={inputValue}
            onChange={handleInputChange}
            type="text"
          />
          <button
            id="submitButton"
            className="bg-crimson9 text-crimson1 w-8 h-8 p-1 rounded-sm hover:bg-crimson10 focus:bg-crimson10 active:bg-crimson10 transition-colors"
            type="submit"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Add todo</span>
          </button>
        </form>
      </main>
    </>
  );
}
