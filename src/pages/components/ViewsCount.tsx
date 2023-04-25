import { useMemo } from "react";

export default function ViewsCount({ count }: { count: number }) {
  const color = useMemo(() => {
    return count < 26
      ? "!text-red-600"
      : count < 51
      ? "!text-orange-600"
      : count < 76
      ? "!text-yellow-600"
      : "!text-green-600";
  }, [count]);
  return <span className={`font-semibold ${color}`}>{count}</span>;
}
