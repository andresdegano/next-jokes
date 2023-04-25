import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useMemo } from "react";

interface IPaginator {
  total: number;
  limit: number;
  onChange?: Function;
  page: number;
}
export default function Paginator(props: IPaginator) {
  const { onChange, limit, page, total } = props;
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);
  const nextPage = () => {
    if (page && totalPages && page < totalPages) {
      const nPage = page + 1;
      onChange &&
        onChange({
          page: nPage,
          limit,
          total,
        });
    }
  };

  const prevPage = () => {
    if (page && page > 1) {
      const nPage = page - 1;
      onChange &&
        onChange({
          page: nPage,
          limit,
          total,
        });
    }
  };
  const handleLimitChange = (e: any) => {
    onChange &&
      onChange({
        page: 1,
        limit: e.target.value,
        total,
      });
  };
  return (
    <div className="flex space-x-4 items-center w-full justify-end">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={`${limit}`}
        label="Page Size"
        onChange={handleLimitChange}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
      <span
        className={`w-7 ${
          page && page > 1
            ? "!text-gray-900 dark:!text-gray-200 cursor-pointer"
            : "!text-gray-300 dark:!text-gray-500"
        }`}
      >
        <ChevronLeft onClick={prevPage} />
      </span>

      <span>{page}</span>
      <span>of</span>
      <span>{totalPages}</span>
      <span
        className={`w-7 ${
          page && totalPages && page < totalPages
            ? "!text-gray-900 dark:!text-gray-200 cursor-pointer"
            : "!text-gray-300 dark:!text-gray-500"
        }`}
      >
        <ChevronRight onClick={nextPage} />
      </span>
    </div>
  );
}
