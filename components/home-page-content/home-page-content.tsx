import { useQuery } from "@tanstack/react-query";

type Task = {
  id: number;
  title: string;
};

export const HomePageContent = () => {
  const { isLoading, error, data } = useQuery<void, unknown, Task[], string[]>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/tasks").then(async (res) =>
        // console.log(await res.json())
        res.json()
      ),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return <p>{data && data.map(({ id, title }) => <p key={id}>{title}</p>)}</p>;
};
