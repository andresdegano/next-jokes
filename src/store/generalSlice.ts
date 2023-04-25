import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Joke, JokeModel, PaginatedJokes } from "@/models/jokes.model";
import server from "@/services/server";

export interface GeneralState {
  isLoading: boolean;
  darkMode: boolean;
  token?: string | null;
  joke?: Joke;
  jokes?: PaginatedJokes;
}

const PaginatedDataInitialState = {
  jokes: [],
  limit: 10,
  page: 1,
  total: 0,
  sortBy: "Title",
  order: "asc",
  query: "",
};

// Initial state
const initialState: GeneralState = {
  darkMode: false,
  token: undefined,
  isLoading: false,
  jokes: PaginatedDataInitialState,
};

// Actual Slice
export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setJokes(state, action) {
      state.jokes = action.payload;
    },
    setJoke(state, action) {
      state.joke = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.general,
      };
    },
  },
});

export const { setDarkMode, setJokes, setIsLoading, setJoke, setToken } =
  generalSlice.actions;

export const selectDarkMode = (state: AppState) => state.general.darkMode;
export const selectIsLoading = (state: AppState) => state.general.isLoading;
export const selectJokes = (state: AppState) => state.general.jokes;
export const selectJoke = (state: AppState) => state.general.joke;
export const selectToken = (state: AppState) => state.general.token;

export const getJokes =
  (
    limit: number,
    page: number,
    sortBy: string,
    order: string,
    query: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await server.getJokes(limit, page, sortBy, order, query);
      const total = Number(response?.headers?.["x-total-count"] || 0);
      dispatch(
        setJokes({
          jokes: response.data,
          total,
          page,
          limit,
          sortBy,
          order,
          query,
        })
      );
    } catch (error) {
      dispatch(setJokes(PaginatedDataInitialState));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getJoke =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await server.getJokebyId(id);
      dispatch(setJoke(response.data));
    } catch (error) {
      dispatch(setJokes(PaginatedDataInitialState));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const updateJoke =
  (data: Joke, onSuccess?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await server.updateJoke(data);
      dispatch(setJoke(response.data));
      onSuccess && onSuccess();
    } catch (error) {
      dispatch(setJokes(PaginatedDataInitialState));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const addJoke =
  (data: JokeModel, onSuccess?: Function): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await server.addJoke(data);
      dispatch(setJoke(response.data));
      onSuccess && onSuccess();
    } catch (error) {
      dispatch(setJokes(PaginatedDataInitialState));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const login = (): AppThunk => async (dispatch) => {
  dispatch(setToken("one_token"));
  localStorage.setItem("token", "one_token");
};
export const logOut = (): AppThunk => async (dispatch) => {
  dispatch(setToken(undefined));
  localStorage.removeItem("token");
};

export default generalSlice.reducer;
