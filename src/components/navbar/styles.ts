import styled from 'styled-components'

import { Container } from '@/globals/grid'
import { theme } from '@/globals/theme'

export const NavbarWrapper = styled.header`
  width: 100%;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.silver};
  padding: 24px 0;
`

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  nav {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @media ${theme.screenSizes.smallScreen} {
    flex-direction: column;
    gap: 16px;

    & > a {
      align-self: flex-start;
    }
  }
`

export const Brand = styled.a`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.dark};
`
