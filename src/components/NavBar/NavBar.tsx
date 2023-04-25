import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import {
  logOut,
  selectDarkMode,
  selectToken,
  setDarkMode,
} from "@/store/generalSlice";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function NavBar() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(selectToken);
  const handleDarkModeChange = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/login");
  };
  return (
    <nav
      className="
      flex flex-wrap
      items-center
      justify-between
      w-full
      py-2
      px-4
      text-lg 
      text-gray-700
      dark:text-gray-50
      bg-gray-100
      dark:bg-gray-800
      mb-4
    "
    >
      <div className="text-lg font-semibold">
        <span className="pr-2">Jokes</span>
        {token && (
          <span onClick={handleLogOut} className="cursor-pointer">
            <Logout />
          </span>
        )}
      </div>
      <div className="flex flex-row gap-2">
        <ToggleSwitch
          defaultChecked={darkMode}
          onChange={(val: boolean) => handleDarkModeChange(val)}
        />
        {darkMode ? <DarkMode /> : <LightMode />}
      </div>
    </nav>
  );
}
