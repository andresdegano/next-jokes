import { Joke } from "@/models/jokes.model";
import ViewsCount from "./ViewsCount";
import { useRouter } from "next/router";
import { useMemo } from "react";
import moment from "moment";
import { obfustacteEmail } from "@/helpers/helpers";

interface JokesListProps {
  jokes: Joke[];
}
export default function JokesList({ jokes }: JokesListProps) {
  const jokesListData = useMemo(() => {
    return jokes.map((joke) => {
      return {
        ...joke,
        CreatedAt: moment(joke?.CreatedAt).format("DD MMM YYYY"),
        Author: obfustacteEmail(joke?.Author),
      };
    });
  }, [jokes]);
  const router = useRouter();
  const headers = ["Title", "Author", "CreatedAt", "Views"];

  return (
    <div className="flex flex-col min-h-[400px]">
      <table className="min-w-full text-left text-sm font-light">
        <thead>
          <tr>
            {headers.map((item) => (
              <th key={item} scope="col" className="px-6 py-4 text-center">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jokesListData?.map((joke) => (
            <tr key={joke.id}>
              <td className="whitespace-nowrap max-w-[200px] px-6 py-4 font-medium border-r dark:border-neutral-500 truncate">
                <span
                  onClick={() =>
                    router.push({
                      pathname: "/jokes",
                      query: { id: joke.id },
                    })
                  }
                  className="hover:underline cursor-pointer"
                >
                  {joke.Title}
                </span>
              </td>
              <td className="whitespace-nowrap max-w-[200px] px-6 py-4 border-r dark:border-neutral-500 truncate">
                {joke.Author}
              </td>
              <td className="whitespace-nowrap max-w-[200px] px-6 py-4 border-r dark:border-neutral-500 truncate">
                {joke.CreatedAt}
              </td>
              <td className="whitespace-nowrap max-w-[200px] px-6 py-4 truncate">
                <ViewsCount count={joke.Views} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
