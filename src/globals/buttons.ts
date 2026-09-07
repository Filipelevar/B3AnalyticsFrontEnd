import type { ButtonHTMLAttributes } from "react";
import { theme } from "./theme";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  success?: boolean;
  warning?: boolean;

  size?: "small" | "medium" | "large";
};

const buttonSizes = {
  small: { height: "32px", padding: "6px 16px" },
  medium: { height: "40px", padding: "8px 20px" },
  large: { height: "48px", padding: "10px 24px" }
}


export const BaseButton = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 6px;
  border: none;
  white-space: nowrap;
  font-weight: 500;
  color: ${theme.colors.yinBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.1s ease-in-out;

  ${({ size = "small" }) => css`
    padding: ${buttonSizes[size].padding};
    min-height: ${buttonSizes[size].height};
    font-size: ${size === "small" ? "13px" : "14px"};
  `}

  &:disabled {
    color: ${theme.colors.battleship};
    border: none;
    background-color: ${theme.colors.silver};
    cursor: unset;
  }
`;


export const PrimaryButton = styled(BaseButton)`
  background-color: ${theme.colors.celeste};
  border: 1px solid ${theme.colors.tiffanyBlue};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.tiffanyBlue};
  }
`;

export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border: 1px solid ${theme.colors.tiffanyBlue};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.battleship};
  }
`;

export const NavbarItem = styled(Link)<{ $isActive?: boolean; $disabled?: boolean }>`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  transition: background-color .2s ease-in-out;
  border-radius: 10px;
  cursor: pointer;

  &:hover:not(:active) {
    background-color: ${theme.colors.white30};
  }

  &:active {
    background-color: ${theme.colors.columbiaBlue} !important;
  }

   &:disabled {
    background-color: ${theme.colors.davysGrey} !important;
  }

  background-color: ${(props) => props.$isActive ? theme.colors.columbiaBlue : "transparent"};

  ${({ $disabled }) => $disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
`