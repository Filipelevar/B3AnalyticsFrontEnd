import styled from 'styled-components'

import { theme } from '@/globals/theme'

export const Label = styled.label<{ $marginBottom?: string }>`
    display: flex;
    flex-direction: column;
    color: ${theme.colors.dark};
    font-weight: 500;
    position: relative;

    ${props => props.$marginBottom && `margin-bottom: ${props.$marginBottom}px !important;`}

    input {
        margin-top: 8px;
        width: 100%;
        padding: 20px 16px;
        border: 1px solid ${theme.colors.silver};
        border-radius: 8px;
        background-color: #EDEDED;
        font-size: 16px;
        outline: none;

        &[type="number"]::-webkit-inner-spin-button,
        &[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type="number"] {
            appearance: textfield;
            -moz-appearance: textfield;
        }

        &::placeholder { color: ${theme.colors.battleship}; }

        &:focus {
            background-color: ${theme.colors.columbiaBlue};
            border-color: ${theme.colors.yinBlue};

            &::placeholder { color: ${theme.colors.yinBlue} }
        }

        &:disabled {
            background-color: ${theme.colors.silver};
            border-color: ${theme.colors.battleship};
        }
    }

    span { color: ${theme.colors.fireBrick}; margin-top: 8px; }

    button#visibility {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        position: absolute;
        right: 4px;
        bottom: 0;
        padding: 16px;
        margin-bottom: 6px;
        border-left: 1px solid ${theme.colors.silver};
        transition: color .2s;
        
        &:hover { 
            color: ${theme.colors.davysGrey};
        }
    }
`