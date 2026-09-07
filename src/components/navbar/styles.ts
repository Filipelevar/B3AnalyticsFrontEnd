import styled from 'styled-components'

import { Container } from '@/globals/grid'
import { theme } from '@/globals/theme'

export const NavbarWrapper = styled.header`
  width: 100%;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.silver};
  padding: 32px 0;
`

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  @media ${theme.screenSizes.smallScreen} {
        flex-direction: column;

        & > a {
            align-self: flex-start;
        }
    }
`


export const Logo = styled.img`
    width: 120px;
    height: 48px;
`

export const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`
export const UserContainer = styled.div`
    display: flex;
    align-items: center;

    gap: 8px;
    margin-left: 8px;
`

export const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

    div {
        display: flex;
        gap: 4px;
    }

    p, span {
        font-size: 12px;
    }

    span {
        color: ${theme.colors.battleship};
        align-self: flex-end;
    }
`

export const UserImageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 8px;
    padding: 4px 4px 4px 8px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        background-color: ${theme.colors.white30};
    }
`