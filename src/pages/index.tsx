import { useCallback, useEffect, useState } from "react";
import JokesList from "./components/JokesList";
import { useDispatch, useSelector } from "react-redux";
import { getJokes, selectJokes } from "@/store/generalSlice";
import Paginator from "@/components/Paginator/Paginator";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import Input from "@/components/Input/Input";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const jokes = useSelector(selectJokes);
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
    sortBy: "Title",
    order: "asc",
    query: "",
  });

  useEffect(() => {
    fetchJokes(query.limit, query.page, query.sortBy, query.order, query.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.limit, query.page, query.sortBy, query.order, query.query]);

  const chamgeSearchHandler = (event: any) => {
    setQuery({ ...query, query: event.target.value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeSearchHandler = useCallback(
    debounce(chamgeSearchHandler, 300),
    [query?.query]
  );

  const fetchJokes = (
    limit: number,
    page: number,
    sortBy: string,
    order: string,
    query: string
  ) => {
    dispatch(getJokes(limit, page, sortBy, order, query));
  };

  const onPaginatorChange = (pagination: { page: number; limit: number }) => {
    setQuery({ ...query, limit: pagination.limit, page: pagination.page });
  };

  const handleSortChange = (e: any) => {
    setQuery({
      ...query,
      sortBy: e.target.value,
    });
  };
  const handleOrderChange = (e: any) => {
    setQuery({
      ...query,
      order: e.target.value,
    });
  };

  return (
    <div className="p-6 rounded overflow-hidden shadow-lg dark:bg-gray-700">
      <div className="flex flex-row content-between flex-grow">
        <div className="text-xl font-semibold flex-grow">Jokes List</div>
        <button
          onClick={() => {
            router.push("/jokes");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add new joke
        </button>
      </div>
      <div className="my-2 max-w-xs">
        <Input
          label={"Search"}
          name={"Search"}
          onChange={debouncedChangeSearchHandler}
        />
      </div>
      <div className="flex flex-row mt-4 items-baseline gap-2">
        <span>SortBy: </span>
        <Select value={`${query.sortBy}`} onChange={handleSortChange}>
          {["Title", "Author", "CreatedAt", "Views"].map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <Select value={`${query.order}`} onChange={handleOrderChange}>
          {["asc", "desc"].map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <JokesList jokes={jokes?.jokes || []} />
      <div className="mt-4">
        <Paginator
          total={jokes?.total || 0}
          limit={jokes?.limit || 0}
          page={jokes?.page || 1}
          onChange={onPaginatorChange}
        />
      </div>
    </div>
  );
}
