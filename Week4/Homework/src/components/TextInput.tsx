import styled from "styled-components";
import React from "react";

const Field = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 15px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 15px;
  outline: none;
  background-color: #ffffff;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorText = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function TextInput({ label, errorMessage, ...rest }: TextInputProps) {
  const inputId = React.useId();

  return (
    <Field>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} {...rest} />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Field>
  );
}
