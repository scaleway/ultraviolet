'use client'

import { consoleLightTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import type { UltravioletUITheme } from '../../theme'
import type { AlignItemsType, JustifyContentType } from './styles.css'
import { row, sprinkles } from './styles.css'
import {
  paddingLarge,
  paddingMedium,
  paddingSmall,
  paddingXlarge,
  paddingXsmall,
  paddingXxsmall,
  templateColumnsLarge,
  templateColumnsMedium,
  templateColumnsSmall,
  templateColumnsXlarge,
  templateColumnsXsmall,
  templateColumnsXxsmall,
} from './variables.css'

type ResponsiveProp<T> =
  | T
  | Partial<Record<keyof UltravioletUITheme['breakpoints'], T>>

// convert union type string into same union type in number
type ToNumber<T extends string> = T extends `${infer N extends number}`
  ? N
  : never

type RowProps = {
  className?: string
  'data-testid'?: string
  children: ReactNode
  templateColumns: ResponsiveProp<string>
  gap?: ResponsiveProp<
    | keyof UltravioletUITheme['space']
    | ToNumber<keyof UltravioletUITheme['space']>
  >
  alignItems?: ResponsiveProp<AlignItemsType>
  justifyContent?: ResponsiveProp<JustifyContentType>
  padding?: ResponsiveProp<CSSProperties['padding']>
}

// It will give a rem value for each breakpoint key
// Ex: gap={{ small: 2, xsmall: 1 }} => { small: '0.5rem', xsmall: '0.25rem' }
const mapRepsonsiveGap = (
  object?: Partial<
    Record<
      keyof typeof consoleLightTheme.breakpoints,
      | keyof typeof consoleLightTheme.space
      | ToNumber<keyof typeof consoleLightTheme.space>
    >
  >,
) =>
  object
    ? Object.keys(object).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            consoleLightTheme.space[
              object[
                key as keyof typeof object
              ] as keyof typeof consoleLightTheme.space
            ],
        }),
        {},
      )
    : {}

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
  <div
    className={`${className ? `${className} ` : ''}${row} ${sprinkles({
      alignItems:
        typeof alignItems === 'object' ? alignItems : { xxsmall: alignItems },
      gap:
        typeof gap === 'object'
          ? mapRepsonsiveGap(gap)
          : { xxsmall: gap ? consoleLightTheme.space[gap] : undefined },
      justifyContent:
        typeof justifyContent === 'object'
          ? justifyContent
          : { xxsmall: justifyContent },
    })}`}
    data-testid={dataTestId}
    style={assignInlineVars({
      [templateColumnsLarge]:
        typeof templateColumns === 'object'
          ? templateColumns.large
          : templateColumns,
      [templateColumnsMedium]:
        typeof templateColumns === 'object'
          ? templateColumns.medium
          : templateColumns,
      [templateColumnsSmall]:
        typeof templateColumns === 'object'
          ? templateColumns.small
          : templateColumns,
      [templateColumnsXlarge]:
        typeof templateColumns === 'object'
          ? templateColumns.xlarge
          : templateColumns,
      [templateColumnsXsmall]:
        typeof templateColumns === 'object'
          ? templateColumns.xsmall
          : templateColumns,
      [templateColumnsXxsmall]:
        typeof templateColumns === 'object'
          ? templateColumns.xxsmall
          : templateColumns,
      [paddingLarge]:
        typeof padding === 'object'
          ? padding.large?.toString() || ''
          : (padding?.toString() ?? ''),
      [paddingXlarge]:
        typeof padding === 'object'
          ? padding.xlarge?.toString() || ''
          : (padding?.toString() ?? ''),
      [paddingMedium]:
        typeof padding === 'object'
          ? padding.medium?.toString() || ''
          : (padding?.toString() ?? ''),
      [paddingSmall]:
        typeof padding === 'object'
          ? padding.small?.toString() || ''
          : (padding?.toString() ?? ''),
      [paddingXsmall]:
        typeof padding === 'object'
          ? padding.xsmall?.toString() || ''
          : (padding?.toString() ?? ''),
      [paddingXxsmall]:
        typeof padding === 'object'
          ? padding.xxsmall?.toString() || ''
          : (padding?.toString() ?? ''),
    })}
  >
    {children}
  </div>
)
