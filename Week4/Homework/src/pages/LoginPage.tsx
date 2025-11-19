import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; 
import { TextInput } from "../components/TextInput";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { requestLogin } from "../api/authApi";
import { fetchMemberById } from "../api/memberApi";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 32px 24px 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 26px;
`;

const ErrorText = styled.p`
  margin: 4px 0 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

const BottomText = styled.p`
  margin-top: 18px;
  font-size: 14px;
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export function LoginPage() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const disabled = !idInput.trim() || !passwordInput.trim() || loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    try {
      setLoading(true);
      setError("");

      const loginData = await requestLogin({
        username: idInput.trim(),
        password: passwordInput,
      });

      localStorage.setItem("userId", String(loginData.userId));

      try {
        const me = await fetchMemberById(loginData.userId);
        localStorage.setItem("userName", me.name);
      } catch (nameErr) {
        console.warn("실패", nameErr);
      }

      navigate("/mypage");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log("로그인 실패", err.response?.status);
        console.log("로그인 실패", err.response?.data);

        const data: any = err.response?.data;
        const msg =
          data?.message ||
          data?.error ||
          "아이디 또는 비밀번호가 올바르지 않습니다.";

        setError(msg);
      } else {
        console.error(err);
        setError("로그인을 할 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Card>
        <Title>로그인</Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="아이디"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />

          <PasswordInput
            label="비밀번호"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button type="submit" disabled={disabled}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        <BottomText>
          아직 계정이 없으신가요?{" "}
          <Link to="/signup">회원가입 하러가기</Link>
        </BottomText>
      </Card>
    </Page>
  );
}
