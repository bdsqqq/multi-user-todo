import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Head from "next/head";
interface user {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function Home() {
  const {
    data: users,
    error,
  }: {
    data?: user[];
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
      <div>
        <main>
          {error && <div>The api threw this error: {error}</div>}

          <ul>
            {users &&
              users.map((user, i) => <li key={user.id}>{user.name}</li>)}
          </ul>
        </main>
      </div>
    </>
  );
}
