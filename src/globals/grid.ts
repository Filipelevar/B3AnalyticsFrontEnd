import styled, { css } from 'styled-components';
import { theme } from '@/globals/theme';
import type { GridProps } from '@/types/components/Gridtypes';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  
  @media ${theme.screenSizes.smallScreen} {
    padding: 0 48px;
  }

  @media ${theme.screenSizes.desktop} {
    padding: 0 64px;
    max-width: 1200px;
  }

  @media only screen and (min-width: 1361px) and (max-width: 1919px) {
    padding: 0 80px;
    max-width: 1488px;
  }

  @media only screen and (min-width: 1920px) {
    padding: 0;
    max-width: 1488px;
  }

  @media ${theme.screenSizes.mobile} {
    padding: 0 20px;
  }

  @media ${theme.screenSizes.tablet} {
    padding: 0 40px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
`;

export const Column = styled.div.withConfig({
  shouldForwardProp: (prop) => !["mobile", "tablet", "desktop"].includes(prop),
})<GridProps>`
  padding-right: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:last-child {
    padding-right: 0;
  }

  @media only screen and (max-width: 768px) {
    ${({ mobile }) => mobile && flexWidth(mobile)}
    padding-right: 0;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    ${({ tablet }) => tablet && flexWidth(tablet)}
    padding-right: 0;
  }

  @media only screen and (min-width: 1024px) {
    ${({ desktop }) => desktop && flexWidth(desktop)}
  }
`;


function flexWidth(value: number) {
  const width = (value / 12) * 100;
  return css`
    flex: 0 0 ${width}%;
    max-width: ${width}%;
  `;
}