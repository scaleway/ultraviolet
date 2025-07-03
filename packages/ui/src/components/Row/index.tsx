'use client'

import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { UltravioletUITheme } from '../../theme'

type StyledRowProps = Pick<
  RowProps,
  'gap' | 'templateColumns' | 'alignItems' | 'justifyContent' | 'padding'
>

export const StyledRow = styled('div', {
  shouldForwardProp: prop =>
    ![
      'templateColumns',
      'gap',
      'alignItems',
      'justifyContent',
      'padding',
    ].includes(prop),
})<StyledRowProps>`
  display: grid;
  ${({
    theme,
    gap,
    alignItems = 'normal',
    templateColumns,
    justifyContent = 'normal',
    padding,
  }) => `

    ${
      typeof templateColumns === 'object'
        ? Object.entries(templateColumns)
            .map(
              ([breakpoint, value]) =>
                `@media (min-width: ${theme.breakpoints[breakpoint as keyof UltravioletUITheme['breakpoints']]}) {
                  grid-template-columns: ${value};
                }`,
            )
            .join(' ')
        : `grid-template-columns: ${templateColumns};`
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
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    ${padding ? `padding: ${padding};` : ''}
  `}
`

type RowProps = {
  className?: string
  'data-testid'?: string
  children: ReactNode
  templateColumns:
    | string
    | Partial<Record<keyof UltravioletUITheme['breakpoints'], string>>
  gap?:
    | keyof UltravioletUITheme['space']
    | number
    | Partial<
        Record<
          keyof UltravioletUITheme['breakpoints'],
          keyof UltravioletUITheme['space'] | number
        >
      >
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  padding?: CSSProperties['padding']
}

/**
 * Row component is a wrapper for grid layout.
 */
export const Row = ({
  className,
  'data-testid': dataTestId,
  children,
  templateColumns,
  alignItems,
  justifyContent,
  gap,
  padding,
}: RowProps) => (
  <StyledRow
    className={className}
    data-testid={dataTestId}
    gap={gap}
    templateColumns={templateColumns}
    alignItems={alignItems}
    justifyContent={justifyContent}
    padding={padding}
  >
    {children}
  </StyledRow>
)
