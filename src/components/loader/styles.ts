import styled from "styled-components";

export const Content = styled.div<{ $fullScreen?: boolean }>`
  position: ${({ $fullScreen = true }) => ($fullScreen ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1060;
  background: rgba(255, 255, 255, 0.9);

  svg {
    width: 72px;
    height: 72px;
    position: relative;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    margin: auto;
  }
`;
