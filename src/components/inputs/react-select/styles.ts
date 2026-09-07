import styled from 'styled-components'
import type { StylesConfig } from 'react-select'

import { theme } from '@/globals/theme'
import type { SelectOption } from './index'

export const selectCustomStyles: StylesConfig<SelectOption, boolean> = {
    control: (base) => ({
        ...base,
        minHeight: '44px',
        borderRadius: 8,
        borderColor: theme.colors.silver,
        backgroundColor: theme.colors.white,
        boxShadow: 'none',
        cursor: 'text',
        '&:hover': {
            borderColor: theme.colors.silver,
        },
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '2px 12px',
    }),
    placeholder: (base) => ({
        ...base,
        color: theme.colors.dark,
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: theme.colors.celeste,
        borderRadius: 6,
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: theme.colors.yinBlue,
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: theme.colors.yinBlue,
        ':hover': {
            backgroundColor: theme.colors.tiffanyBlue,
            color: theme.colors.yinBlue,
        },
    }),
    menu: (base) => ({
        ...base,
        zIndex: 20,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? theme.colors.columbiaBlue
            : state.isFocused
                ? theme.colors.white30
                : theme.colors.white,
        color: theme.colors.dark,
        cursor: 'pointer',
    }),
}

export const ReactSelectError = styled.span`
  color: ${theme.colors.fireBrick};
  font-size: 13px;
`
