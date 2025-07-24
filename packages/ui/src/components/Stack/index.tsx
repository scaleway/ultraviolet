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
  alignItems?:
    | CSSProperties['alignItems']
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          CSSProperties['alignItems']
        >
      >
  justifyContent?:
    | CSSProperties['justifyContent']
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          CSSProperties['justifyContent']
        >
      >
  wrap?:
    | boolean
    | CSSProperties['flexWrap']
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          boolean | CSSProperties['flexWrap']
        >
      >
  width?:
    | CSSProperties['width']
    | Partial<
        Record<keyof UltravioletUITheme['breakpoints'], CSSProperties['width']>
      >
  maxWidth?:
    | CSSProperties['maxWidth']
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          CSSProperties['maxWidth']
        >
      >
  minWidth?:
    | CSSProperties['minWidth']
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          CSSProperties['minWidth']
        >
      >
  flex?:
    | CSSProperties['flex']
    | Partial<
        Record<keyof UltravioletUITheme['breakpoints'], CSSProperties['flex']>
      >
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
  ${wrap && typeof wrap === 'boolean' ? 'flex-wrap: wrap;' : ''}
    ${
      wrap && typeof wrap === 'object'
        ? Object.entries(wrap)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
               flex-wrap: ${value};
              }`,
            )
            .join(' ')
        : `${wrap && typeof wrap !== 'boolean' ? `flex-wrap: ${wrap};` : ''}`
    }
    ${
      minWidth && typeof minWidth === 'object'
        ? Object.entries(minWidth)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                min-width: ${value};
              }`,
            )
            .join(' ')
        : `${minWidth ? `min-width: ${minWidth};` : ''}`
    }
    ${
      maxWidth && typeof maxWidth === 'object'
        ? Object.entries(maxWidth)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                max-width: ${value};
              }`,
            )
            .join(' ')
        : `${maxWidth ? `max-width: ${maxWidth};` : ''}`
    }
    ${
      width && typeof width === 'object'
        ? Object.entries(width)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                width: ${value};
              }`,
            )
            .join(' ')
        : `${width ? `width: ${width};` : ''}`
    }
    ${
      flex && typeof flex === 'object'
        ? Object.entries(flex)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                flex: ${value};
              }`,
            )
            .join(' ')
        : `${flex ? `flex: ${flex};` : ''}`
    }
    ${
      alignItems && typeof alignItems === 'object'
        ? Object.entries(alignItems)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                align-items: ${value};
              }`,
            )
            .join(' ')
        : `${alignItems ? `align-items: ${alignItems};` : ''}`
    }
    ${
      justifyContent && typeof justifyContent === 'object'
        ? Object.entries(justifyContent)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                justify-content: ${value};
              }`,
            )
            .join(' ')
        : `${justifyContent ? `justify-content: ${justifyContent};` : ''}`
    }
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
        : `${direction ? `flex-direction: ${direction};` : ''}`
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
        : `${gap ? `gap: ${theme.space[gap as keyof UltravioletUITheme['space']]};` : ''}`
    }
  `}
`
