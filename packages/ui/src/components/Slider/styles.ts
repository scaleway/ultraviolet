import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { THUMB_SIZE } from './constant'

export const SliderContainer = styled(Stack)<{ 'data-options': boolean }>`
    &[data-options='true'][data-double='true']{
      margin-bottom: ${({ theme }) => theme.space['3']}
    }
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
  left: number,
  isDouble: boolean,
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

      position: absolute;
      left: calc(${left}% - ${THUMB_SIZE / 2}px);
      top: -${THUMB_SIZE / (isDouble ? 2 : 4)}px;
  `
