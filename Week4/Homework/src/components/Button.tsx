// src/components/Button.tsx
import styled from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonKind = "primary" | "danger" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonKind;
  children: ReactNode;
};

const BaseButton = styled.button<{ $variant: ButtonKind }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, opacity 0.15s ease;
  box-shadow: ${({ theme }) => theme.shadow.soft};

  ${({ theme, $variant }) => {
    if ($variant === "danger") {
      return `
        background-color: ${theme.colors.danger};
        color: #ffffff;
      `;
    }
    if ($variant === "ghost") {
      return `
        background-color: ${theme.colors.cardBg};
        color: ${theme.colors.textMain};
        border: 1px solid ${theme.colors.border};
        box-shadow: none;
      `;
    }
    return `
      background-color: ${theme.colors.primary};
      color: #ffffff;
    `;
  }}

  &:hover:enabled {
    background-color: ${({ theme, $variant }) =>
      $variant === "danger"
        ? "#ff3c5f"
        : $variant === "ghost"
        ? theme.colors.cardBg
        : theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active:enabled {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export function Button({ variant = "primary", children, ...rest }: Props) {
  return (
    <BaseButton $variant={variant} {...rest}>
      {children}
    </BaseButton>
  );
}
