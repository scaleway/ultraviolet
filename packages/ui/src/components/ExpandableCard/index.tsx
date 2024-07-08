import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ForwardedRef, ReactNode } from 'react'
import { forwardRef, useReducer, useRef } from 'react'
import type { XOR } from '../../types'
import { Card } from '../Card'
import { Expandable } from '../Expandable'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { ExpandableCardTitle } from './Title'

const StyledHeaderStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};

  cursor: pointer;
  &[data-disabled="true"] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-radius: ${({ theme }) => theme.radii.default};
    cursor: not-allowed;
  }
`

const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space['3']}
`

export const EXPANDABLE_CARD_SIZE = ['medium', 'large'] as const
type ExpandableCardSize = (typeof EXPANDABLE_CARD_SIZE)[number]

type CommonProps = {
  header: ReactNode
  size?: ExpandableCardSize
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
      size = 'medium',
      children,
      disabled,
      expanded,
      onToggleExpanded,
    }: ExpandableCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [isExpanded, toggleExpanded] = useReducer(
      prevState => !prevState,
      false,
    )

    const computedExpanded = expanded !== undefined ? expanded : isExpanded
    const onToggle =
      onToggleExpanded !== undefined ? onToggleExpanded : toggleExpanded

    const headerRef = useRef<HTMLDivElement>(null)

    return (
      <Card
        ref={ref}
        noPadding
        aria-label={computedExpanded ? 'collapse' : 'expand'}
        isActive={computedExpanded}
      >
        <StyledHeaderStack
          data-disabled={!!disabled}
          ref={headerRef}
          direction="row"
          alignItems="center"
          width="100%"
          gap={2}
          tabIndex={!disabled ? 0 : undefined}
          onClick={!disabled ? onToggle : undefined}
          onKeyDown={
            !disabled
              ? event => {
                  if (event.key === ' ' && event.target === headerRef.current) {
                    onToggle()
                    event.preventDefault()
                  }
                }
              : undefined
          }
        >
          <Icon
            sentiment="neutral"
            disabled={disabled}
            name={computedExpanded ? 'arrow-up' : 'arrow-down'}
          />
          {typeof header === 'string' ? (
            <ExpandableCardTitle size={size} disabled={disabled}>
              {header}
            </ExpandableCardTitle>
          ) : (
            header
          )}
        </StyledHeaderStack>
        {computedExpanded ? <Separator /> : null}
        <Expandable opened={computedExpanded}>
          <StyledContent>{children}</StyledContent>
        </Expandable>
      </Card>
    )
  },
)

/**
 * List is a card that can be collapsed and expanded to reveal more content.
 */
export const ExpandableCard = Object.assign(BaseExpandableCard, {
  Title: ExpandableCardTitle,
})
