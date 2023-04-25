import { Joke, JokeModel } from "@/models/jokes.model";
import axios, { AxiosInstance } from "axios";

class ApiService {
  api: AxiosInstance;
  private static singleton: ApiService;
  constructor() {
    this.api = axios.create({
      baseURL: "https://retoolapi.dev/zu9TVE",
    });
  }

  static getInstance(): ApiService {
    if (this.singleton) {
      return this.singleton;
    } else {
      this.singleton = new ApiService();
      return this.singleton;
    }
  }

  async getJokes(
    limit: number,
    page: number,
    sortBy: string,
    order: string,
    query: string
  ) {
    const data = await this.api.get(
      `/jokes/?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}&q=${query}`
    );
    return data;
  }

  async getJokebyId(id: number) {
    const response = await this.api.get(`/jokes/${id}`);
    return response;
  }
  async updateJoke(data: Joke) {
    const response = await this.api.put(`/jokes/${data.id}`, data);
    return response;
  }

  async addJoke(data: JokeModel) {
    const response = await this.api.post(`/jokes`, data);
    return response;
  }
  async deleteJoke(id: number) {
    const response = await this.api.get(`/jokes/${id}`);
    return response;
  }
}

export default ApiService.getInstance();
