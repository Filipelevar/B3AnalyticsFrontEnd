import styled from 'styled-components'

import { theme } from '@/globals/theme'

export const Wrapper = styled.div`
  position: relative;
`

export const TriggerButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${theme.colors.silver};
  border-radius: 20px;
  background-color: ${theme.colors.white};
  padding: 6px 16px 6px 6px;
  font-size: 14px;
  color: ${theme.colors.dark};
`

export const Panel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.silver};
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 12px;
  z-index: 10;
`
