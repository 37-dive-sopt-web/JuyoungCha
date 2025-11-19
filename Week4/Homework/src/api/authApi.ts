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

// 로그인: POST /auth/login  (success 래퍼 응답)
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

// 회원가입: POST /users  (유저 객체를 그대로 리턴, success 래퍼 없음)
export async function requestSignup(body: SignupRequest): Promise<void> {
  await httpClient.post("/users", body);
}
