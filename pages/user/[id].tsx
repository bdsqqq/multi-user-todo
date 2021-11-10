import { useEffect } from "react";
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
      </main>
    </>
  );
}
