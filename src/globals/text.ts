import styled from "styled-components";
import { theme } from "./theme";

export const Title = styled.h1`
    font-weight: 700;
    font-size: 24px;
`

export const Subtitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

export const LargeTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`;

export const SmallTitle = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const AlertError = styled.span`
  color: ${theme.colors.fireBrick};
`;