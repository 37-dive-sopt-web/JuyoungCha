import axios from "axios";

export const httpClient = axios.create({
  baseURL: "/api/v1",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};
