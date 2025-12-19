'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { borderedBox, stackCard } from './styles.css'

type CardProps = {
  children: ReactNode
  /**
   * Header can be a string but also a component if you need more complex header.
   */
  header?: ReactNode
  subHeader?: ReactNode
  /**
   * active enable a primary style on Card component for when you need to highlight it.
   */
  active?: boolean
  disabled?: boolean
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Card component is a simple component to display content in a box with a border.
 */
export const Card = forwardRef(
  (
    {
      header,
      subHeader,
      disabled = false,
      active = false,
      children,
      className,
      'data-testid': dataTestId,
      style,
    }: CardProps,
    ref: Ref<HTMLDivElement>,
  ) =>
    header ? (
      <Stack
        className={cn(className, stackCard)}
        data-disabled={disabled}
        data-testid={dataTestId}
        gap={1}
        ref={ref}
        style={style}
      >
        {typeof header === 'string' ? (
          <Text
            as="h2"
            disabled={disabled}
            prominence="strong"
            sentiment="neutral"
            variant="heading"
          >
            {header}
          </Text>
        ) : (
          header
        )}
        <div
          className={borderedBox}
          data-disabled={disabled}
          data-is-active={active}
        >
          {subHeader ? (
            <Stack gap={2}>
              {typeof subHeader === 'string' ? (
                <Text
                  as="h3"
                  disabled={disabled}
                  sentiment="neutral"
                  variant="headingSmallStrong"
                >
                  {subHeader}
                </Text>
              ) : (
                subHeader
              )}
              {children}
            </Stack>
          ) : (
            children
          )}
        </div>
      </Stack>
    ) : (
      <div
        className={cn(className, borderedBox)}
        data-disabled={disabled}
        data-is-active={active}
        data-testid={dataTestId}
        ref={ref}
        style={style}
      >
        {subHeader ? (
          <Stack gap={2}>
            {typeof subHeader === 'string' ? (
              <Text
                as="h3"
                disabled={disabled}
                sentiment="neutral"
                variant="headingSmallStrong"
              >
                {subHeader}
              </Text>
            ) : (
              subHeader
            )}
            {children}
          </Stack>
        ) : (
          children
        )}
      </div>
    ),
)
