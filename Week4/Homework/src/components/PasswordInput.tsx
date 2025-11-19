import styled from "styled-components";
import React from "react";
import VisibleIcon from "../assets/visibility.svg";
import HiddenIcon from "../assets/visibility_off.svg";

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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #ffffff;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 2px 0;
`;

const ToggleButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const ErrorText = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  errorMessage?: string;
};

export function PasswordInput({
  label,
  errorMessage,
  ...rest
}: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const inputId = React.useId();

  return (
    <Field>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <InputWrapper>
        <Input
          id={inputId}
          type={show ? "text" : "password"}
          {...rest}
          autoComplete="new-password"
        />
        <ToggleButton
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          <img src={show ? HiddenIcon : VisibleIcon} alt="" />
        </ToggleButton>
      </InputWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Field>
  );
}
