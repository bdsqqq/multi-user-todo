import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";
import Link from "next/link";
import { user as userInterface } from "@/lib/types";

export default function Home() {
  const {
    data: users,
    error,
  }: {
    data?: userInterface[];
    error?: any;
  } = useSWR("https://jsonplaceholder.typicode.com/users", fetcher);

  useEffect(() => {
    if (users) console.log({ users });
    if (error) console.log({ error });
  }, [users, error]);

  return (
    <>
      <Head>
        <title>Multi User Todo</title>
      </Head>
      <main className="p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8">
          Click on a user to see their todo items
        </h1>
        {error && <div>The api threw this error: {error}</div>}

        <ul className="">
          {users &&
            users.map((user, i) => (
              <Link key={`user-${user.id}`} href={`user/${user.id}`} passHref>
                <a
                  className={`block relative p-2 border border-t-0 first-of-type:border-t border-mauve6 hover:bg-mauve4 hover:border-mauve7 transition-colors focus:z-10 hover:text-crimson10 ${
                    (i + 1) % 2 == 0 ? "bg-mauve3" : "bg-mauve2"
                  }`}
                >
                  <li key={user.id}>
                    {user.name}{" "}
                    <span className="text-mauve11">- @{user.username}</span>
                  </li>
                </a>
              </Link>
            ))}
        </ul>
      </main>
    </>
  );
}
