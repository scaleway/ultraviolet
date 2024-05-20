import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { Stack, Text } from '@ultraviolet/ui'
import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react'

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

type CardProps = {
  title?: string
  subtitle?: string
  description?: string
  children?: ReactNode
  href: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  ref?: Ref<HTMLAnchorElement>
}

export const Card = ({
  title,
  subtitle,
  description,
  children,
  href,
  target = '_blank',
  ref,
}: CardProps) => (
  <StyledWrapper href={href} target={target} ref={ref}>
    <FullHeightStack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <StyledStack gap="0.5">
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
      </StyledStack>
      <IconWrapper>
        <Icon name="open-in-new" color="neutral" />
      </IconWrapper>
    </FullHeightStack>
  </StyledWrapper>
)
