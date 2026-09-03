import styled from 'styled-components'

import { theme } from '@/globals/theme'

export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 146px;

  img {
    width: clamp(100px, 10vw, 160px);
    height: auto;
  }

  @media ${theme.screenSizes.desktop} {
    margin-bottom: 48px;
  }

  @media ${theme.screenSizes.smallScreen} {
    margin-bottom: 80px;
  }
`

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 40px;

  a {
    color: ${theme.colors.dark};
  }

  @media ${theme.screenSizes.smallScreen} {
    padding-right: 0;
  }
`

export const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: calc(100dvh - 64px);
    width: 100%;
    border-radius: 12px;
    object-fit: contain;
  }

  @media ${theme.screenSizes.smallScreen} {
    display: none;
    visibility: none;
  }
`

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 40px 0;

  @media ${theme.screenSizes.smallScreen} {
    margin: 24px 0;
  }
`
