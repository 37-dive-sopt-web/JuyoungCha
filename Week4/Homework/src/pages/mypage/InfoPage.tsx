import { useEffect, useState } from "react";
import styled from "styled-components";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import {
  fetchMemberById,
  updateMyInfo,
  type Member,
} from "../../api/memberApi";

const Wrapper = styled.div`
  padding: 2px 4px;
`;

const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 22px;
`;

const IdRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  font-size: 15px;
`;

const IdLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
`;

const IdValue = styled.span`
  font-weight: 600;
`;

export function InfoPage() {
  const [memberData, setMemberData] = useState<Member | null>(null);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialAge, setInitialAge] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("userId");
    if (!savedId) return;

    const id = Number(savedId);
    if (Number.isNaN(id) || id <= 0) return;

    async function load() {
      try {
        const data = await fetchMemberById(id);

        setMemberData(data);
        setNameInput(data.name ?? "");
        setEmailInput(data.email ?? "");
        setAgeInput(String(data.age ?? ""));

        setInitialName(data.name ?? "");
        setInitialEmail(data.email ?? "");
        setInitialAge(String(data.age ?? ""));
      } catch (err) {
        console.error("내 정보 조회 실패:", err);
        alert("내 정보를 불러올 수 없습니다.");
      }
    }

    load();
  }, []);

  if (!memberData) {
    return (
      <Wrapper>
        <Title>내 정보</Title>
        <p>로딩 중...</p>
      </Wrapper>
    );
  }

  const isChanged =
    nameInput !== initialName ||
    emailInput !== initialEmail ||
    ageInput !== initialAge;

  const isSaveDisabled =
    isSaving ||
    !nameInput.trim() ||
    !emailInput.trim() ||
    !ageInput.trim() ||
    !isChanged;

  async function handleClickSave() {
    if (isSaveDisabled) return;

    try {
      setIsSaving(true);

      const updated = await updateMyInfo(memberData.id, {
        name: nameInput.trim(),
        email: emailInput.trim(),
        age: Number(ageInput),
      });

      setMemberData(updated);
      setInitialName(updated.name ?? "");
      setInitialEmail(updated.email ?? "");
      setInitialAge(String(updated.age ?? ""));

      alert("정보가 저장되었습니다.");
    } catch (err) {
      console.error("정보 저장 실패:", err);
      alert("저장을 할 수 없습니다.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Wrapper>
      <Title>내 정보</Title>

      <IdRow>
        <IdLabel>아이디</IdLabel>
        <IdValue>{memberData.username}</IdValue>
      </IdRow>

      <TextInput
        label="이름"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <TextInput
        label="이메일"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <TextInput
        label="나이"
        type="number"
        value={ageInput}
        onChange={(e) => setAgeInput(e.target.value)}
      />

      <Button onClick={handleClickSave} disabled={isSaveDisabled}>
        {isSaving ? "저장 중..." : "저장"}
      </Button>
    </Wrapper>
  );
}
