import { httpClient, type ApiResponse } from "./httpClient";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginData = {
  userId: number;
  message: string;
};

export type SignupRequest = {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
};

export async function requestLogin(body: LoginRequest): Promise<LoginData> {
  const res = await httpClient.post<ApiResponse<LoginData>>(
    "/auth/login",
    body,
  );
  const payload = res.data;

  if (!payload.success) {
    throw new Error(payload.message || "로그인에 실패했습니다.");
  }

  return payload.data;
}

export async function requestSignup(body: SignupRequest): Promise<void> {
  await httpClient.post("/users", body);
}
