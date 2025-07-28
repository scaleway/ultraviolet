'use client'

import styled from '@emotion/styled'
import type { ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

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
}

const StyledStack = styled(Stack)`
  &[data-disabled='true'] {
    cursor: not-allowed;
  }
`

const BorderedBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['3']};

  &[data-is-active='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  flex: 1 1 auto;
`

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
    }: CardProps,
    ref: Ref<HTMLDivElement>,
  ) =>
    header ? (
      <StyledStack
        className={className}
        data-disabled={disabled}
        data-testid={dataTestId}
        gap={1}
        ref={ref}
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
        <BorderedBox data-disabled={disabled} data-is-active={active}>
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
        </BorderedBox>
      </StyledStack>
    ) : (
      <BorderedBox
        className={className}
        data-disabled={disabled}
        data-is-active={active}
        data-testid={dataTestId}
        ref={ref}
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
      </BorderedBox>
    ),
)
