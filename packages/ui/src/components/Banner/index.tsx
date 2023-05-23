import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'

type Variant = 'intro' | 'promotional'
type Size = 'small' | 'medium'

const Container = styled('div', {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop),
})<{ variant: Variant; size: Size }>`
  padding: ${({ theme, size }) => theme.space[size === 'small' ? '2' : '3']};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme, variant }) =>
    variant === 'intro'
      ? theme.colors.primary.background
      : theme.colors.primary.backgroundStrong};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['2.25']};

  > svg:first-child,
  > img {
    height: ${({ size }) => (size === 'medium' ? '140px' : '100px')};
    align-self: center;
  }
`

type BannerProps = {
  variant?: Variant
  size?: 'small' | 'medium'
  title: string
  children: ReactNode
  direction?: 'row' | 'column'
  onClose?: () => void
  buttonText?: string
  onClickButton?: ComponentProps<typeof Button>['onClick']
  linkText?: string
  linkHref?: string
  image?: ReactNode
  className?: string
}

export const Banner = ({
  variant = 'intro',
  size = 'medium',
  title,
  children,
  direction = 'column',
  onClose,
  buttonText,
  onClickButton,
  linkText,
  linkHref,
  image,
  className,
}: BannerProps) => {
  const [opened, setOpened] = useState(true)

  if (!opened) return null

  return (
    <Container variant={variant} size={size} className={className}>
      {image}
      <Stack
        direction={direction}
        gap={2}
        justifyContent="space-between"
        alignItems={direction === 'column' ? 'start' : 'center'}
        style={{ flex: 1 }}
      >
        <Stack gap={0.5} style={{ flex: 1 }}>
          <Text
            as="p"
            variant={size === 'medium' ? 'headingSmall' : 'bodyStronger'}
            color="primary"
            prominence={variant === 'intro' ? 'default' : 'strong'}
          >
            {title}
          </Text>
          <Text
            as="p"
            variant="body"
            color="neutral"
            prominence={variant === 'intro' ? 'default' : 'stronger'}
          >
            {children}
          </Text>
        </Stack>
        <Stack direction="row" gap={2}>
          {buttonText ? (
            <Button
              size="medium"
              sentiment={variant === 'intro' ? 'primary' : 'neutral'}
              onClick={onClickButton}
            >
              {buttonText}
            </Button>
          ) : null}
          {linkText && direction === 'column' ? (
            <Link
              variant="primary"
              size="small"
              target="_blank"
              href={linkHref ?? ''}
              prominence={variant === 'intro' ? 'default' : 'strong'}
            >
              {linkText}
            </Link>
          ) : null}
        </Stack>
      </Stack>
      <Button
        icon="close"
        size="small"
        variant={variant === 'intro' ? 'ghost' : 'filled'}
        sentiment={variant === 'intro' ? 'neutral' : 'primary'}
        onClick={() => {
          setOpened(false)
          onClose?.()
        }}
      />
    </Container>
  )
}
