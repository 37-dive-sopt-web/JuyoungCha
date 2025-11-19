import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../layout/Header";
import { Modal } from "../../components/Modal";
import { removeMember } from "../../api/memberApi";

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

const Main = styled.main`
  max-width: 960px;
  margin: 32px auto;
`;

const Card = styled.section`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  padding: 30px 35px;
`;

function getLoginMemberId(): number | null {
  const raw = localStorage.getItem("userId");
  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
}

export function MyPage() {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleConfirmDelete = async () => {
    if (deleting) return;

    const memberId = getLoginMemberId();
    if (!memberId) return;

    try {
      setDeleting(true);
      await removeMember(memberId);

      alert("회원탈퇴가 완료되었습니다.");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("회원탈퇴를 할 수 없습니다.");
    } finally {
      setDeleting(false);
      setOpenDeleteModal(false);
    }
  };

  return (
    <Wrapper>
      <Header
        onLogout={handleLogout}
        onOpenDeleteModal={() => setOpenDeleteModal(true)}
      />
      <Main>
        <Card>
          <Outlet />
        </Card>
      </Main>

      <Modal
        isOpen={openDeleteModal}
        title="정말 탈퇴하시겠어요?"
        description="탈퇴 후에는 모든 정보가 삭제됩니다."
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </Wrapper>
  );
}
