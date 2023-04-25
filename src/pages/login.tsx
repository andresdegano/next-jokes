import { login } from "@/store/generalSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = () => {
    dispatch(login());
    router.push("/");
  };
  return (
    <div className="mt-12 p-12 rounded overflow-hidden shadow-lg dark:bg-gray-700 max-w-xs text-center flex flex-col m-auto gap-8">
      <div className="text-xl font-semibold">Please Log in</div>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start here
      </button>
    </div>
  );
}
