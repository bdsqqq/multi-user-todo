import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Home() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  useEffect(() => {
    if (data) console.log({ data });
    if (error) console.log({ error });
  }, [data, error]);

  return <div />;
}
