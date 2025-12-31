'use client'

import { consoleLightTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  CSSProperties,
  ElementType,
  PropsWithChildren,
  ReactElement,
} from 'react'
import { forwardRef, useMemo } from 'react'
import type { UltravioletUITheme } from '../../theme'
import type { AlignItemsType, JustifyContentType } from './styles.css'
import { sprinkles, stack } from './styles.css'
import type { PolymorphicComponentProps } from './types'
import { flexVar, maxWidthVar, minWidthVar, widthVar } from './variables.css'

type ResponsiveProp<T> =
  | T
  | Partial<Record<keyof UltravioletUITheme['breakpoints'], T>>

// convert union type string into same union type in number
type ToNumber<T extends string> = T extends `${infer N extends number}`
  ? N
  : never

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

type OwnStackProps = {
  gap?: ResponsiveProp<
    | keyof UltravioletUITheme['space']
    | ToNumber<keyof UltravioletUITheme['space']>
  >
  direction?: ResponsiveProp<
    'row' | 'column' | 'row-reverse' | 'column-reverse'
  >
  alignItems?: ResponsiveProp<AlignItemsType>
  justifyContent?: ResponsiveProp<JustifyContentType>
  wrap?: ResponsiveProp<boolean | CSSProperties['flexWrap']>
  width?: CSSProperties['width']
  maxWidth?: CSSProperties['maxWidth']
  minWidth?: CSSProperties['minWidth']
  flex?: CSSProperties['flex']
  className?: string
  'data-testid'?: string
  id?: string
}

export type StackProps<T extends ElementType = 'div'> =
  PolymorphicComponentProps<T, OwnStackProps>

/**
 * We can't easily type a GenericComponent with forwardRef
 * https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 * will be remove when react will drop support of forwardRef into react 20.
 */
// oxlint-disable-next-line typescript-eslint/no-explicit-any
const IStack = forwardRef<any, PropsWithChildren<StackProps>>(
  (
    {
      gap,
      direction = 'column',
      alignItems = 'normal',
      justifyContent = 'normal',
      wrap = 'nowrap',
      className,
      children,
      id,
      'data-testid': dataTestId,
      width,
      maxWidth,
      minWidth,
      flex,
      as,
      style,
      ...props
    },
    ref,
  ) => {
    const wrapValue = useMemo(() => {
      if (typeof wrap === 'boolean') {
        return wrap ? 'wrap' : 'nowrap'
      }

      if (typeof wrap === 'object') {
        return Object.keys(wrap).reduce(
          (acc, key) => ({
            ...acc,
            [key]: wrap[key as keyof typeof wrap] ? 'wrap' : 'nowrap',
          }),
          {},
        )
      }

      return wrap
    }, [wrap])

    const Component = as ?? 'div'

    const sprinkleClassName = sprinkles({
      alignItems:
        typeof alignItems === 'object' ? alignItems : { xxsmall: alignItems },
      flexDirection:
        typeof direction === 'object' ? direction : { xxsmall: direction },
      flexWrap:
        typeof wrapValue === 'object' ? wrapValue : { xxsmall: wrapValue },
      gap:
        typeof gap === 'object'
          ? mapRepsonsiveGap(gap)
          : { xxsmall: gap ? consoleLightTheme.space[gap] : undefined },
      justifyContent:
        typeof justifyContent === 'object'
          ? justifyContent
          : { xxsmall: justifyContent },
    })

    const combinedClassName = [className, stack, sprinkleClassName]
      .filter(Boolean)
      .join(' ')

    return (
      <Component
        className={combinedClassName}
        data-testid={dataTestId}
        id={id}
        ref={ref}
        style={{
          ...assignInlineVars({
            [widthVar]: width?.toString(),
            [maxWidthVar]: maxWidth?.toString(),
            [minWidthVar]: minWidth?.toString(),
            [flexVar]: flex?.toString(),
          }),
          ...style,
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </Component>
    )
  },
)

export const Stack = IStack as <T extends ElementType = 'div'>(
  props: StackProps<T>,
) => ReactElement
