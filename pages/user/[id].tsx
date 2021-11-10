import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const router = useRouter();
  const { id: userId } = router.query;

  const {
    data: todos,
    error,
  }: {
    data?: todo[];
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
          {todos && todos.map((todo, i) => <li key={todo.id}>{todo.title}</li>)}
        </ul>
      </main>
    </>
  );
}
