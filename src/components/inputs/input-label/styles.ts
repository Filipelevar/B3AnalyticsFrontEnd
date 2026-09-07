import styled, { css } from "styled-components";
import { Input } from "../input";
import { theme } from "../../../globals/theme";

export const Content = styled.div<{leftLabel?: boolean}>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: "Ubuntu", sans-serif;

    ${(props) =>
    props.leftLabel &&
    css`
        flex-direction: row;
        align-items: center;

        input {
            border-radius: 2px
        }
    `
    }
`;

export const ContainerInput = styled.div<{ error: boolean }>`
  flex: 0 1 auto;
  min-width: 0;
  max-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 12px;
  background: ${theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${props => props.error ? theme.colors.fireBrick : theme.colors.silver};
  cursor: text;

`;

export const StyledLabel = styled.label`
  white-space: nowrap;
  font-size: 16;
  font-weight: 600;
`;

export const StyledInput = styled(Input)`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;

  &::placeholder {
    color: ${theme.colors.white30};
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    background: none;
  }
` as unknown as typeof Input;