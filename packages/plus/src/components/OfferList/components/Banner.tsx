'use client'

import styled from '@emotion/styled'
import { List, Stack, Text } from '@ultraviolet/ui'
import { ComponentProps, ReactNode } from 'react'

const BannerStack = styled(Stack, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: ComponentProps<typeof List.Row>['sentiment'] }>`

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


  &[data-border-top="true"] {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-bottom: 0px solid transparent;

    border-radius:  0 0 ${({ theme }) => theme.radii.default} ${({ theme }) =>
      theme.radii.default};

  }

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  }
`

type BannerProps = {
  children: ReactNode
  sentiment?: ComponentProps<typeof List.Row>['sentiment']
  borderTop?: boolean
  disabled?: boolean
}

export const Banner = ({
  children,
  sentiment = 'neutral',
  borderTop,
  disabled,
}: BannerProps) => (
  <BannerStack
    sentiment={sentiment}
    data-border-top={borderTop}
    aria-disabled={disabled}
  >
    <Text as="p" variant="caption" sentiment={sentiment} disabled={disabled}>
      {children}
    </Text>
  </BannerStack>
)
