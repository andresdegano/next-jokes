import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import NavBar from "@/components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDarkMode,
  selectIsLoading,
  setToken,
} from "@/store/generalSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import LoadingView from "@/components/LoadingView/LoadingView";
import { RouteGuard } from "@/guards/RoutesGuard";
function App({ Component, pageProps }: AppProps) {
  const darkMode = useSelector(selectDarkMode);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      const token = localStorage.getItem("token");
      dispatch(setToken(token));
    };
  });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );
  return (
    <div className={`${darkMode && "dark"}`}>
      <ThemeProvider theme={theme}>
        <div className="bg-gray-50 text-gray-800 dark:text-gray-200 dark:bg-gray-600">
          <div className="min-h-screen">
            <NavBar />
            <div className="mx-2 md:mx-12">
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
              {isLoading && <LoadingView />}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default wrapper.withRedux(App);
