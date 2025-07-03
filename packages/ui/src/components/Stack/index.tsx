'use client'

import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { UltravioletUITheme } from '../../theme'

type StackProps = {
  gap?:
    | keyof UltravioletUITheme['space']
    | number
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          keyof UltravioletUITheme['space'] | number
        >
      >
  direction?:
    | 'row'
    | 'column'
    | Partial<Record<keyof UltravioletUITheme['breakpoints'], 'row' | 'column'>>
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  wrap?: boolean | CSSProperties['flexWrap']
  width?: CSSProperties['width']
  maxWidth?: CSSProperties['maxWidth']
  minWidth?: CSSProperties['minWidth']
  flex?: CSSProperties['flex']
  className?: string
  children: ReactNode
  'data-testid'?: string
  id?: string
}

/**
 * A Stack is a widget that organize children in a vertical or horizontal layout based on css Flex,
 * it accepts few props to deal with spacing and align.
 */
export const Stack = styled('div', {
  shouldForwardProp: prop =>
    ![
      'gap',
      'direction',
      'alignItems',
      'justifyContent',
      'wrap',
      'width',
      'maxWidth',
      'minWidth',
      'flex',
    ].includes(prop),
})<StackProps>`
  display: flex;

  ${({
    theme,
    gap,
    direction = 'column',
    alignItems = 'normal',
    justifyContent = 'normal',
    wrap = 'nowrap',
    width,
    maxWidth,
    minWidth,
    flex,
  }) => `
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-wrap: ${typeof wrap === 'boolean' ? 'wrap' : wrap};
    ${flex ? `flex: ${flex};` : ''}
    ${width ? `width: ${width};` : ''}
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
    ${minWidth ? `min-width: ${minWidth};` : ''}

    ${
      direction && typeof direction === 'object'
        ? Object.entries(direction)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                flex-direction: ${value};
              }`,
            )
            .join(' ')
        : `flex-direction: ${direction};`
    }

    ${
      gap && typeof gap === 'object'
        ? Object.entries(gap)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                gap: ${theme.space[value.toString() as keyof UltravioletUITheme['space']]};
              }`,
            )
            .join(' ')
        : `gap: ${gap ? theme.space[gap as keyof UltravioletUITheme['space']] : ''};`
    }
  `}
`
