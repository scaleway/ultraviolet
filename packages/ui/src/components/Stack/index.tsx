'use client'

import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { UltravioletUITheme } from '../../theme'

type StackProps = {
  gap?: keyof UltravioletUITheme['space'] | number
  direction?: 'row' | 'column'
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  wrap?: boolean | CSSProperties['flexWrap']
  width?: CSSProperties['width']
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
      'flex',
    ].includes(prop),
})<StackProps>`
  display: flex;

  ${({
    theme,
    gap = 0,
    direction = 'column',
    alignItems = 'normal',
    justifyContent = 'normal',
    wrap = 'nowrap',
    width,
    flex,
  }) => `
    gap: ${theme.space[gap as keyof UltravioletUITheme['space']]};
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-wrap: ${typeof wrap === 'boolean' ? 'wrap' : wrap};
    ${flex ? `flex: ${flex};` : ''}
    ${width ? `width: ${width};` : ''}
  `}
`
