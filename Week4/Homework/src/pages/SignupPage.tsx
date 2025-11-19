import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { requestSignup } from "../api/authApi";
import ArrowBackIcon from "../assets/arrow_back.svg";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 28px 24px 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;
`;

const ErrorText = styled.p`
  margin: 4px 0 12px;
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

function checkPasswordRule(password: string): boolean {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasSpace = /\s/.test(password);
  const correctLength = password.length >= 8 && password.length <= 64;

  return (
    correctLength && hasUpper && hasLower && hasNumber && hasSpecial && !hasSpace
  );
}

function getPasswordError(password: string, check: string): string {
  if (!password || !check) {
    return "비밀번호와 확인란을 모두 입력해주세요.";
  }
  if (!checkPasswordRule(password)) {
    return "8~64자, 대/소문자·숫자·특수문자 각각 1자 이상, 공백은 사용할 수 없어요.";
  }
  if (password !== check) {
    return "비밀번호가 서로 일치하지 않습니다.";
  }
  return "";
}

type Step = 1 | 2 | 3;

export function SignupPage() {
  const [step, setStep] = useState<Step>(1);

  // 아이디
  const [idInput, setIdInput] = useState("");
  const [idError, setIdError] = useState("");

  // 비밀번호
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordCheckInput, setPasswordCheckInput] = useState("");

  // 프로필
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  // 뒤로가기
  const handleClickBack = () => {
    if (step === 1) {
      navigate("/"); 
    } else {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  function handleChangeId(value: string) {
    setIdInput(value);

    if (!value.trim()) {
      setIdError("아이디를 입력해주세요.");
    } else if (value.length > 50) {
      setIdError("아이디는 50자 이하여야 합니다.");
    } else {
      setIdError("");
    }
  }

  const canGoStep2 = !!idInput.trim() && idError === "";

  const passwordError = getPasswordError(passwordInput, passwordCheckInput);
  const canGoStep3 =
    !!passwordInput &&
    !!passwordCheckInput &&
    passwordError === "" &&
    checkPasswordRule(passwordInput);

  function handleChangeEmail(value: string) {
    setEmailInput(value);

    if (!value.trim()) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  }

  function handleChangeAge(value: string) {
    setAgeInput(value);

    if (!value.trim()) {
      setAgeError("나이를 입력해주세요.");
      return;
    }

    const num = Number(value);
    if (!Number.isInteger(num) || num <= 0) {
      setAgeError("숫자를 입력해주세용.");
    } else {
      setAgeError("");
    }
  }

  const canSubmit =
    !!nameInput.trim() &&
    !!emailInput.trim() &&
    !!ageInput.trim() &&
    !emailError &&
    !ageError &&
    !submitLoading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitLoading(true);
      await requestSignup({
        username: idInput,
        password: passwordInput,
        name: nameInput,
        email: emailInput,
        age: Number(ageInput),
      });
      alert(`${nameInput}님, 회원가입이 완료되었습니다.`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <Page>
      <Card>
        <HeaderRow>
          <BackButton type="button" onClick={handleClickBack}>
            <img src={ArrowBackIcon} alt="뒤로가기" />
          </BackButton>
          <Title>회원가입</Title>
        </HeaderRow>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canGoStep2) setStep(2);
            }}
          >
            <TextInput
              label="아이디"
              value={idInput}
              onChange={(e) => handleChangeId(e.target.value)}
              placeholder="아이디를 입력해주세요"
              errorMessage={idError}
            />
            <Button type="submit" disabled={!canGoStep2}>
              다음
            </Button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canGoStep3) setStep(3);
            }}
          >
            <PasswordInput
              label="비밀번호"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <PasswordInput
              label="비밀번호 확인"
              value={passwordCheckInput}
              onChange={(e) => setPasswordCheckInput(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
            <Button type="submit" disabled={!canGoStep3}>
              다음
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <TextInput
              label="이름"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
            <TextInput
              label="이메일"
              value={emailInput}
              onChange={(e) => handleChangeEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              errorMessage={emailError}
            />
            <TextInput
              label="나이"
              value={ageInput}
              onChange={(e) => handleChangeAge(e.target.value)}
              placeholder="숫자로 입력"
              type="number"
              errorMessage={ageError}
            />
            <Button type="submit" disabled={!canSubmit}>
              {submitLoading ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>
        )}

        <BottomText>
          이미 계정이 있으신가요?{" "}
          <Link to="/">로그인으로 돌아가기</Link>
        </BottomText>
      </Card>
    </Page>
  );
}
