import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";

export default function Home() {
  const { data: users, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  useEffect(() => {
    if (users) console.log({ users });
    if (error) console.log({ error });
  }, [users, error]);

  return (
    <>
      <Head>
        <title>Multi User Todo</title>
      </Head>
      <div>
        <header>
          <nav></nav>
        </header>
        <main>
          <ul>
            {users &&
              users.map((user, i) => <li key={user.id}>{user.name}</li>)}
          </ul>
        </main>
      </div>
    </>
  );
}
