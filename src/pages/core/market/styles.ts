import styled from 'styled-components'

import { PrimaryButton } from '@/globals/buttons'
import { theme } from '@/globals/theme'

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  margin: 32px 0;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
  min-width: 160px;

`

export const SearchButton = styled(PrimaryButton)`
  box-sizing: border-box;
  height: 44px;
  min-height: 44px;
`

export const ChartWrapper = styled.div`
  width: 100%;
  height: 420px;
`

export const AssetTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.dark};
  margin: 24px 0 4px;
`

export const SessionDate = styled.span`
  display: inline-block;
  font-size: 13px;
  color: ${theme.colors.davysGrey};
  margin-bottom: 4px;
`

export const RangeButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`

export const CustomPeriodForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid ${theme.colors.silver};

  input {
    padding: 8px 12px;
    border: 1px solid ${theme.colors.silver};
    border-radius: 6px;
    font-size: 14px;
  }

  span {
    font-size: 14px;
    color: ${theme.colors.battleship};
  }
`

export const RangeButton = styled.button<{ $active?: boolean }>`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.silver};
  background-color: ${({ $active }) => ($active ? theme.colors.yinBlue : theme.colors.white)};
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.dark)};
  font-size: 14px;
`

export const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`

export const StatusText = styled.p`
  color: ${theme.colors.battleship};
  font-size: 14px;
`
