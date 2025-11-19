import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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

  @media (max-width: 768px) {
    display: none;
  }
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

const MenuButton = styled.button`
  display: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 999px;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  span {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 999px;
    background-color: #ffffff;
    position: relative;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    border-radius: 999px;
    background-color: #ffffff;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  span::before {
    top: -6px;
  }

  span::after {
    top: 6px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.12);
    animation: ${slideDown} 0.22s ease-out;
  }
`;

const MobileLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 20px;
  font-size: 15px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMain};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

const MobileItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 12px 20px;
  font-size: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMain};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

export function Header({ onLogout, onOpenDeleteModal }: HeaderProps) {
  const location = useLocation();
  const userName = localStorage.getItem("userName") ?? "";
  const [openMenu, setOpenMenu] = useState(false);

  const isInfo = location.pathname === "/mypage";
  const isMembers = location.pathname.startsWith("/mypage/members");

  const handleLogoutClick = () => {
    onLogout();
    setOpenMenu(false);
  };

  const handleClickDelete = () => {
    onOpenDeleteModal();
    setOpenMenu(false);
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

        <MenuButton
          type="button"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-label={openMenu ? "메뉴 닫기" : "메뉴 열기"}
        >
          <span />
        </MenuButton>
      </Inner>

      <MobileMenu $open={openMenu}>
        <MobileLink to="/mypage" onClick={() => setOpenMenu(false)}>
          내 정보
        </MobileLink>
        <MobileLink to="/mypage/members" onClick={() => setOpenMenu(false)}>
          회원 조회
        </MobileLink>
        <MobileItem type="button" onClick={handleClickDelete}>
          회원탈퇴
        </MobileItem>
        <MobileItem type="button" onClick={handleLogoutClick}>
          로그아웃
        </MobileItem>
      </MobileMenu>
    </Bar>
  );
}
