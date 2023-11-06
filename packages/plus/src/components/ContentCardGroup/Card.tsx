import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { Stack, Text } from '@ultraviolet/ui'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

type CardProps = {
  title?: string
  subtitle?: string
  description?: string
  children?: ReactNode
  href: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

const IconWrapper = styled.div`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  padding: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
`

const StyledWrapper = styled.a`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.space['3']};
  text-decoration: none;

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
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

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  (
    { title, subtitle, description, children, href, target = '_blank' },
    ref,
  ) => (
    <StyledWrapper href={href} target={target} ref={ref}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack gap="0.5">
          <div>
            {subtitle ? (
              <Text
                as="h5"
                variant="caption"
                prominence="weak"
                sentiment="neutral"
                oneLine
              >
                {subtitle}
              </Text>
            ) : null}
            <Text as="h3" variant="bodyStrong" sentiment="neutral" oneLine>
              {title}
            </Text>
          </div>
          {description ? (
            <Text as="p" variant="bodySmall" sentiment="neutral" oneLine>
              {description}
            </Text>
          ) : null}
          {children}
        </Stack>
        <IconWrapper>
          <Icon name="open-in-new" color="neutral" />
        </IconWrapper>
      </Stack>
    </StyledWrapper>
  ),
)
