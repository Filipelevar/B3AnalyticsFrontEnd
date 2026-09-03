import styled from 'styled-components'

import { theme } from '@/globals/theme'

const SIZES = { small: 28, medium: 36, large: 72 } as const

export const AvatarCircle = styled.div<{ $size: keyof typeof SIZES }>`
  width: ${({ $size }) => SIZES[$size]}px;
  height: ${({ $size }) => SIZES[$size]}px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${theme.colors.celeste};
  border: 1px solid ${theme.colors.tiffanyBlue};
  color: ${theme.colors.yinBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ $size }) => ($size === 'large' ? '28px' : $size === 'medium' ? '14px' : '12px')};
`
