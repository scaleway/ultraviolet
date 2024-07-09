import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ForwardedRef, ReactNode } from 'react'
import { forwardRef, useRef } from 'react'
import type { XOR } from '../../types'
import { ExpandableCardTitle } from './subComponents/Title'

const StyledSummary = styled.summary`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:  ${({ theme }) => theme.space['2']};
  padding: ${({ theme }) => theme.space['3']};
  list-style-type: none;

  cursor: pointer;
  &[data-disabled="true"] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-radius: ${({ theme }) => theme.radii.default};
    cursor: not-allowed;
  }
`

const StyledContent = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space['3']}
`

const StyledDetails = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &[open] {
    border-color: ${({ theme }) => theme.colors.primary.border};

    & > ${StyledContent} {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }
  }
`

export const EXPANDABLE_CARD_SIZE = ['medium', 'large'] as const
type ExpandableCardSize = (typeof EXPANDABLE_CARD_SIZE)[number]

type CommonProps = {
  header: ReactNode
  size?: ExpandableCardSize
  name?: string
  children: ReactNode
  disabled?: boolean
}
type ExpandableCardProps = XOR<
  [
    CommonProps & { expanded: boolean; onToggleExpanded: () => void },
    CommonProps,
  ]
>
const BaseExpandableCard = forwardRef(
  (
    {
      header,
      name,
      size = 'medium',
      children,
      disabled,
      expanded,
      onToggleExpanded,
    }: ExpandableCardProps,
    ref: ForwardedRef<HTMLDetailsElement>,
  ) => {
    const headerRef = useRef<HTMLDivElement>(null)

    return (
      <StyledDetails
        tabIndex={disabled ? -1 : undefined}
        name={name}
        open={expanded !== undefined ? expanded : undefined}
        ref={ref}
      >
        <StyledSummary
          data-disabled={!!disabled}
          ref={headerRef}
          onClick={event => {
            if (disabled || onToggleExpanded) {
              onToggleExpanded?.()
              event.preventDefault()
            }
          }}
          onKeyDown={event => {
            if (
              onToggleExpanded &&
              event.key === ' ' &&
              event.target === headerRef.current
            ) {
              onToggleExpanded()
              event.preventDefault()
            }
          }}
        >
          <Icon sentiment="neutral" disabled={disabled} name="arrow-up" />
          {typeof header === 'string' ? (
            <ExpandableCardTitle size={size} disabled={disabled}>
              {header}
            </ExpandableCardTitle>
          ) : (
            header
          )}
        </StyledSummary>
        <StyledContent>{children}</StyledContent>
      </StyledDetails>
    )
  },
)

// /**
//  * ExpandableCard is a card that can be collapsed and expanded to reveal more content.
//  */
export const ExpandableCard = Object.assign(BaseExpandableCard, {
  Title: ExpandableCardTitle,
})
