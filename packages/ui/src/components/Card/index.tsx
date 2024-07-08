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
  /**
   * isActive enable a primary style on Card component for when you need to highlight it.
   */
  isActive?: boolean
  /**
   * Remove the default padding outside content
   */
  noPadding?: boolean
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

const StyledStack = styled(Stack)`
  &[data-disabled='true'] {
    background: blue;
    cursor: not-allowed;
  }
`

const BorderedBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:not[data-no-padding='true'] {
    padding: ${({ theme }) => theme.space['3']};
  }

  &[data-is-active='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
  }
`

/**
 * Card component is a simple component to display content in a box with a border.
 */
export const Card = forwardRef(
  (
    {
      header,
      disabled = false,
      isActive = false,
      noPadding = false,
      children,
      className,
      'data-testid': dataTestId,
    }: CardProps,
    ref: Ref<HTMLDivElement>,
  ) =>
    header ? (
      <StyledStack
        gap={1}
        className={className}
        data-testid={dataTestId}
        data-disabled={disabled}
        ref={ref}
      >
        {typeof header === 'string' ? (
          <Text variant="heading" as="h2" disabled={disabled}>
            {header}
          </Text>
        ) : (
          header
        )}
        <BorderedBox data-is-active={isActive} data-disabled={disabled}>
          {children}
        </BorderedBox>
      </StyledStack>
    ) : (
      <BorderedBox
        data-is-active={isActive}
        data-disabled={disabled}
        data-no-padding={noPadding}
        className={className}
        data-testid={dataTestId}
        ref={ref}
      >
        {children}
      </BorderedBox>
    ),
)
