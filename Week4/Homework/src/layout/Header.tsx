import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

type HeaderProps = {
  onLogout: () => void;
  onOpenDeleteModal: () => void;
};

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.12);
  color: #ffffff;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const Greeting = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TabLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) =>
    $active ? "#ffffff" : "rgba(255, 255, 255, 0.8)"};
  padding-bottom: 4px;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid #ffffff" : "2px solid transparent"};

  &:hover {
    color: #ffffff;
  }
`;

const TabAction = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0 0 4px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const GhostButton = styled.button`
  border: none;
  background: none;
  padding: 0 4px 4px 0;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #ffffff;
  }
`;

export function Header({ onLogout, onOpenDeleteModal }: HeaderProps) {
  const location = useLocation();
  const userName = localStorage.getItem("userName") ?? "";

  const isInfo = location.pathname === "/mypage";
  const isMembers = location.pathname.startsWith("/mypage/members");

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleClickDelete = () => {
    onOpenDeleteModal();
  };

  return (
    <Bar>
      <Inner>
        <LeftArea>
          <Title>마이페이지</Title>
          <Greeting>
            {userName ? `안녕하세요, ${userName}님` : "안녕하세요!"}
          </Greeting>
        </LeftArea>

        <Nav>
          <TabLink to="/mypage" $active={isInfo}>
            내 정보
          </TabLink>
          <TabLink to="/mypage/members" $active={isMembers}>
            회원 조회
          </TabLink>
          <TabAction type="button" onClick={handleClickDelete}>
            회원탈퇴
          </TabAction>
          <GhostButton type="button" onClick={handleLogoutClick}>
            로그아웃
          </GhostButton>
        </Nav>
      </Inner>
    </Bar>
  );
}
