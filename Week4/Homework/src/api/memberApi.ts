import { httpClient, type ApiResponse } from "./httpClient";

export type Member = {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
};

export type UpdateMemberBody = {
  name: string;
  email: string;
  age: number;
};

export async function fetchMemberById(id: number): Promise<Member> {
  const res = await httpClient.get<ApiResponse<Member>>(`/users/${id}`);
  const body = res.data;

  if (!body.success) {
    throw new Error(body.message || "회원 조회를 할 수 없습니다.");
  }

  return body.data;
}

export async function updateMyInfo(
  id: number,
  body: UpdateMemberBody,
): Promise<Member> {
  const res = await httpClient.patch<ApiResponse<Member>>(`/users/${id}`, body);
  const payload = res.data;

  if (!payload.success) {
    throw new Error(payload.message || "정보를 수정할 수 없습니다.");
  }

  return payload.data;
}

export async function removeMember(id: number): Promise<void> {
  const res = await httpClient.delete<ApiResponse<null>>(`/users/${id}`);
  const payload = res.data;

  if (!payload.success) {
    throw new Error(payload.message || "회원탈퇴를 할 수 없습니다.");
  }
}
