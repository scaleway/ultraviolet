import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

type CardProps = {
  /**
   * Children can be a component, but it can also be a function to get disabled and
   * isActive state from Card.
   */
  children:
    | ReactNode
    | ((renderProps: { disabled?: boolean; isActive?: boolean }) => ReactNode)
  /**
   * Header can be a string but also a component if you need more complex header.
   */
  header?: ReactNode
  /**
   * isActive enable a primary style on Card component for when you need to highlight it.
   */
  isActive?: boolean
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

  &[data-isActive='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
  }
`

export const Card = ({
  header,
  disabled = false,
  isActive = false,
  children,
  className,
  'data-testid': dataTestId,
}: CardProps) => (
  <StyledStack
    gap={1}
    className={className}
    data-testid={dataTestId}
    data-disabled={disabled}
  >
    {typeof header === 'string' ? (
      <Text variant="heading" as="h2" disabled={disabled}>
        {header}
      </Text>
    ) : (
      header
    )}
    <BorderedBox data-isActive={isActive} data-disabled={disabled}>
      {typeof children === 'function'
        ? children({ disabled, isActive })
        : children}
    </BorderedBox>
  </StyledStack>
)
