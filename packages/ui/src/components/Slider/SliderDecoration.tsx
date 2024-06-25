import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { NumberInputV2 } from '../NumberInputV2'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'

export const DataList = styled.datalist`  
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
align-items: stretch;
`

export const Option = styled('span', {
  shouldForwardProp: prop => !['left'].includes(prop),
})<{ left: number }>`
text-align: left;
display: flex;
justify-content: space-between;
position: absolute;
transform: translateX(${({ left }) => left}px);
`

export const SliderContainer = styled(Stack)<{ 'data-options': boolean }>`
    min-width: ${SLIDER_WIDTH.min}px;
    max-width: ${SLIDER_WIDTH.max}px;

    &[data-options="true"]{ 
      margin-bottom: ${({ theme }) => theme.space[2]}
      }
`

export const StyledNumberInput = styled(NumberInputV2)`
  min-width: 44px;
  max-width: fit-content;
`

export const StyledText = styled(Text)<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space[5])};
  align-self: ${({ double }) => (double ? 'center' : 'end')};
`

export const StyledTooltip = styled(Tooltip, {
  shouldForwardProp: prop => !['left'].includes(prop),
})<{ left: number }>`
width: fit-content;
position: absolute;
left: ${({ left }) => left}px;
`

export const trackStyle = ` 
    appearance: none;
    -webkit-appearance: none; 
    box-shadow: none; 
    border: transparent; 
    background: transparent; 
`

export const thumbStyle = (
  theme: Theme,
  themeSlider: string,
  disabled: boolean,
) => `
      -webkit-appearance: none;
      appearance: none;
      pointer-events: all;
      width: ${THUMB_SIZE}px;
      height: ${THUMB_SIZE}px;
      background: ${themeSlider === 'light' ? theme.colors.neutral.background : theme.colors.neutral.backgroundStronger};
      box-shadow: ${theme.shadows.defaultShadow};
      border-radius: ${theme.radii.circle};
      border: none;
      cursor: ${disabled ? 'not-allowed' : 'grab'};
      transition: background 0.3s ease-in-out;
  
      &:hover, :active {
      border: ${disabled ? null : `1.5px solid ${theme.colors.primary.border}`};
      }
  
      &:active {
      box-shadow: ${disabled ? null : theme.shadows.focusPrimary};
      cursor: ${disabled ? 'not-allowed' : 'grabbing'};
      }
  `
