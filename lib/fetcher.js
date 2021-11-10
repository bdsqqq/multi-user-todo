/**
 *  swr requires a fetcher function, this is the implementation from https://swr.vercel.app/docs/getting-started#quick-start
 * */
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
