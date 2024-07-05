import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { NumberInputV2 } from '../NumberInputV2'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'

export const DataList = styled.datalist`  
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
align-items: stretch;

&[data-double='true'] {
  margin-top: ${({ theme }) => theme.space['3']};
}
`

export const Option = styled('span', {
  shouldForwardProp: prop => !['left', 'width'].includes(prop),
})<{ left: number; width: number }>`
display: flex;
justify-content: space-between;
position: absolute;
transform: translateX(${({ left }) => left}px);
width: ${({ width }) => width}px;
text-align: center;
justify-content: center;


&[data-first-element='true'] {
text-align: left;
justify-content: left;
}
`

export const SliderContainer = styled(Stack)<{ 'data-options': boolean }>`
    min-width: ${SLIDER_WIDTH.min}px;
    max-width: ${SLIDER_WIDTH.max}px;

    &[data-options='true']{ 
      margin-bottom: ${({ theme }) => theme.space['2']}
      }
`

export const StyledNumberInput = styled(NumberInputV2)`
  width: 60px;
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
      box-shadow: ${theme.shadows.fixed[0]}, ${theme.shadows.fixed[1]};
      border-radius: ${theme.radii.circle};
      border: none;
      cursor: ${disabled ? 'not-allowed' : 'grab'};
      transition: background 0.3s ease-in-out;
  
      &:hover, :active, :focus {
      border: ${disabled ? null : `1.5px solid ${theme.colors.primary.border}`};
      }
  
      &:active, :focus {
      box-shadow: ${disabled ? null : theme.shadows.focusPrimary};
      cursor: ${disabled ? 'not-allowed' : 'grabbing'};
      }
  `
