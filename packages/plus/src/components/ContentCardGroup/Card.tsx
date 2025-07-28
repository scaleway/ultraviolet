'use client'

import styled from '@emotion/styled'
import { OpenInNewIcon } from '@ultraviolet/icons'
import { Stack, Text } from '@ultraviolet/ui'
import type { AnchorHTMLAttributes, ElementType, ReactNode } from 'react'
import { forwardRef } from 'react'

type CardProps = {
  title?: string
  titleAs?: ElementType
  subtitle?: string
  subtitleAs?: ElementType
  description?: string
  children?: ReactNode
  href: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

const StyledStack = styled(Stack)`
  min-width: 0;
`

const IconWrapper = styled.div`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  padding: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
`

const StyledWrapper = styled.a`
  padding: ${({ theme }) => theme.space['3']};
  text-decoration: none;
  height: 100%;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }

  &:first-child {
    border-radius: ${({ theme }) => theme.radii.default}
      ${({ theme }) => theme.radii.default} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${({ theme }) => theme.radii.default}
      ${({ theme }) => theme.radii.default};
  }

  & ${IconWrapper} {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};

    & ${IconWrapper} {
      background: none;
    }
  }
`

const FullHeightStack = styled(Stack)`
  height: 100%;
`

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  (
    {
      title,
      titleAs,
      subtitle,
      subtitleAs,
      description,
      children,
      href,
      target = '_blank',
    },
    ref,
  ) => (
    <StyledWrapper href={href} ref={ref} target={target}>
      <FullHeightStack
        alignItems="center"
        direction="row"
        gap={2}
        justifyContent="space-between"
      >
        <StyledStack gap="0.5">
          <div>
            {subtitle ? (
              <Text
                as={subtitleAs || 'h5'}
                oneLine
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {subtitle}
              </Text>
            ) : null}
            <Text
              as={titleAs || 'h3'}
              oneLine
              sentiment="neutral"
              variant="bodyStrong"
            >
              {title}
            </Text>
          </div>
          {description ? (
            <Text as="p" oneLine sentiment="neutral" variant="bodySmall">
              {description}
            </Text>
          ) : null}
          {children}
        </StyledStack>
        <IconWrapper>
          <OpenInNewIcon sentiment="neutral" />
        </IconWrapper>
      </FullHeightStack>
    </StyledWrapper>
  ),
)
