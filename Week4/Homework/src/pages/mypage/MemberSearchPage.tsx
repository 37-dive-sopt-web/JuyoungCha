import { useState } from "react";
import styled from "styled-components";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { fetchMemberById, type Member } from "../../api/memberApi";

const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 22px;
`;

const InfoBox = styled.div`
  margin-top: 24px;
  padding: 24px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
`;

const Value = styled.span`
  font-weight: 600;
`;

export function MemberSearchPage() {
  const [searchId, setSearchId] = useState("");
  const [target, setTarget] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  const disabled = !searchId.trim() || loading;

  async function handleSearch() {
    if (disabled) return;

    try {
      setLoading(true);
      const idNumber = Number(searchId);
      const data = await fetchMemberById(idNumber);
      setTarget(data);
    } catch (err) {
      console.error(err);
      setTarget(null);
      alert("해당 회원을 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Title>회원 조회</Title>

      <TextInput
        label="회원 ID"
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="숫자로 입력해주세요"
      />
      <Button type="button" disabled={disabled} onClick={handleSearch}>
        {loading ? "조회 중..." : "확인"}
      </Button>

      {target && (
        <InfoBox>
          <Row>
            <Label>이름</Label>
            <Value>{target.name}</Value>
          </Row>
          <Row>
            <Label>아이디</Label>
            <Value>{target.username}</Value>
          </Row>
          <Row>
            <Label>이메일</Label>
            <Value>{target.email}</Value>
          </Row>
          <Row>
            <Label>나이</Label>
            <Value>{target.age}</Value>
          </Row>
        </InfoBox>
      )}
    </div>
  );
}
