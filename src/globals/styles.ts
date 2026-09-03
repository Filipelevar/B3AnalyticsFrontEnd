import styled, { createGlobalStyle, css } from 'styled-components';
import { theme } from '@/globals/theme';
import { Row } from '@/globals/grid';


export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${theme.colors.white};
    color: ${theme.colors.dark};
  }
`;


export const GlobalContainer = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

export const PagesContainer = styled.main`
  flex: 1;
  padding: 40px 0;
`


export const TitleSection = styled(Row)<{ isFlexColumn?: boolean }>`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    font-size: 16px;
    font-weight: 400;
  }

  ${({ isFlexColumn }) => isFlexColumn && css`
    @media ${theme.screenSizes.xxMobile} {
      flex-direction: column;
      gap: 16px;
    }
  `}
`