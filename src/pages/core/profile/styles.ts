import styled from 'styled-components'

import { theme } from '@/globals/theme'

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 360px;
  margin-top: 32px;
  padding: 40px;
  border: 1px solid ${theme.colors.silver};
  border-radius: 12px;
`

export const ProfileField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.colors.silver};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  label {
    font-size: 12px;
    color: ${theme.colors.battleship};
  }

  p {
    font-size: 16px;
    color: ${theme.colors.dark};
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    cursor: pointer;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    color: ${theme.colors.battleship};

    &:hover {
      color: ${theme.colors.davysGrey};
    }
  }
`
