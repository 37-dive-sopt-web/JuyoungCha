// src/components/Modal.tsx
import styled from "styled-components";
import { Button } from "./Button";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Panel = styled.div`
  width: 480px;
  max-width: 90%;
  padding: 32px 28px 24px;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 18px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
  text-align: center;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSub};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function Modal({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <Panel>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <ButtonRow>
          <Button variant="ghost" type="button" onClick={onCancel}>
            취소
          </Button>
          <Button variant="danger" type="button" onClick={onConfirm}>
            회원탈퇴
          </Button>
        </ButtonRow>
      </Panel>
    </Backdrop>
  );
}
