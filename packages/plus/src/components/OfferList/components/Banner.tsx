'use client'

import styled from '@emotion/styled'
import { List, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'

const ExpandableWrapper = styled.tr`
  width: 100%;
  display: table-row;
  vertical-align: middle;
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
    theme.radii.default};
  transform: translate3d(0, -${({ theme }) => theme.space['2']}, 0);
  position: relative;

  td, td:first-child, td:last-child {
    transition:
      box-shadow 200ms ease,
      border-color 200ms ease;
  }

  td {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-top: none;
    border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
      theme.radii.default};
  }
`

const StyledCell = styled(List.Cell, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: ComponentProps<typeof List.Row>['sentiment'] }>`
  height: fit-content;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme, sentiment }) => {
    if (sentiment && sentiment !== 'neutral') {
      return theme.colors[sentiment].background
    }

    return theme.colors.neutral.backgroundWeak
  }};
  width: 100%;
  padding-block: ${({ theme }) => theme.space['0.5']};
  padding-inline: ${({ theme }) => theme.space['1']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  }
`

const StyledStack = styled(Stack, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: ComponentProps<typeof List.Row>['sentiment'] }>`
  height: fit-content;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};

  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
    theme.radii.default};
  background-color: ${({ theme, sentiment }) => {
    if (sentiment && sentiment !== 'neutral') {
      return theme.colors[sentiment].background
    }

    return theme.colors.neutral.backgroundWeak
  }};
  width: 100%;
  padding-block: ${({ theme }) => theme.space['0.5']};
  padding-inline: ${({ theme }) => theme.space['1']};

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  }
`

type BannerProps = {
  children: ReactNode
  sentiment?: ComponentProps<typeof List.Row>['sentiment']
  disabled?: boolean
  colSpan?: number
  type?: 'cell' | 'div'
}

export const Banner = ({
  children,
  sentiment = 'neutral',
  disabled,
  colSpan = 1000,
  type = 'div',
}: BannerProps) =>
  type === 'div' ? (
    <StyledStack sentiment={sentiment} aria-disabled={disabled}>
      <Text as="p" variant="caption" sentiment={sentiment} disabled={disabled}>
        {children}
      </Text>
    </StyledStack>
  ) : (
    <ExpandableWrapper data-expandable-content>
      <StyledCell
        colSpan={colSpan}
        sentiment={sentiment}
        aria-disabled={disabled}
      >
        <Text
          as="p"
          variant="caption"
          sentiment={sentiment}
          disabled={disabled}
        >
          {children}
        </Text>
      </StyledCell>
    </ExpandableWrapper>
  )
