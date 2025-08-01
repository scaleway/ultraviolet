'use client'

import styled from '@emotion/styled'
import { List, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'

const BannerWrapper = styled.tr`
  width: 100%;
  display: table-row;
  vertical-align: middle;
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
    theme.radii.default};
  position: relative;

  td, td:first-child, td:last-child {
    transition:
      box-shadow 200ms ease,
      border-color 200ms ease;
  }
`

const StyledText = styled(Text, {
  shouldForwardProp: prop => !['sentiment', 'primaryBorder'].includes(prop),
})<{
  sentiment: ComponentProps<typeof List.Row>['sentiment']
  primaryBorder?: boolean
}>`
  transition: border-color 200ms ease;
  margin-top: -${({ theme }) => theme.space[2]};
  padding-block: ${({ theme }) => theme.space['0.5']};
  padding-inline: ${({ theme }) => theme.space['1']};
  border: 1px solid ${({ theme, primaryBorder, disabled }) => (primaryBorder && !disabled ? theme.colors.primary.border : theme.colors.neutral.border)};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
    theme.radii.default};

  background-color: ${({ theme, sentiment, disabled }) => {
    if (sentiment && sentiment !== 'neutral') {
      return theme.colors[sentiment][
        disabled ? 'backgroundDisabled' : 'background'
      ]
    }

    return theme.colors.neutral[
      disabled ? 'backgroundWeak' : 'backgroundWeakDisabled'
    ]
  }};

  color: ${({ theme, sentiment, disabled }) => theme.colors[sentiment ?? 'neutral'][disabled ? 'textDisabled' : 'text']};
`

const StyledCell = styled(List.Cell)`
  height: fit-content;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 100%;
  padding: 0;
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
  shouldHavePrimaryBorder?: boolean
}

export const Banner = ({
  children,
  sentiment = 'neutral',
  disabled,
  colSpan = 1000,
  type = 'div',
  shouldHavePrimaryBorder,
}: BannerProps) =>
  type === 'div' ? (
    <StyledStack aria-disabled={disabled} sentiment={sentiment}>
      <Text as="p" disabled={disabled} sentiment={sentiment} variant="caption">
        {children}
      </Text>
    </StyledStack>
  ) : (
    <BannerWrapper>
      <StyledCell aria-disabled={disabled} colSpan={colSpan}>
        <StyledText
          as="p"
          disabled={disabled}
          primaryBorder={shouldHavePrimaryBorder}
          sentiment={sentiment}
          variant="caption"
        >
          {children}
        </StyledText>
      </StyledCell>
    </BannerWrapper>
  )
