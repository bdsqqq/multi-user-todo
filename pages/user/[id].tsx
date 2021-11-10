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
        <title>user {userId}'s Todos</title>
      </Head>
      <header className="sticky top-0 p-4 bg-mauve3 border-b border-mauve5">
        <nav>
          <Link href="/" passHref>
            <a className="hover:text-crimson9 focus:ring-0 focus:text-crimson10 transition-colors">
              Back home
            </a>
          </Link>
        </nav>
      </header>
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
            className="bg-crimson9 text-crimson1 px-2 py-1 rounded-sm hover:bg-crimson10 focus:bg-crimson10 active:bg-crimson10 transition-colors"
            type="submit"
          >
            Add
          </button>
        </form>
      </main>
    </>
  );
}
