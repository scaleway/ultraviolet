import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { ButtonV2 } from '../ButtonV2'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'

type Type = 'intro' | 'promotional'
type Size = 'small' | 'medium'

const Container = styled('div', {
  shouldForwardProp: prop => !['type', 'size'].includes(prop),
})<{ type: Type; size: Size }>`
  padding: ${({ theme, size }) => theme.space[size === 'small' ? '2' : '3']};
  border-radius: ${({ theme }) => theme.radii.large};
  background: ${({ theme, type }) =>
    type === 'intro'
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
  type?: Type
  size?: 'small' | 'medium'
  title: string
  children: ReactNode
  direction?: 'row' | 'column'
  onClose?: ComponentProps<typeof ButtonV2>['onClick']
  buttonText?: string
  onClickButton?: ComponentProps<typeof ButtonV2>['onClick']
  linkText?: string
  linkHref?: string
  image?: ReactNode
  className?: string
}

export const Banner = ({
  type = 'intro',
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
}: BannerProps) => (
  <Container type={type} size={size} className={className}>
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
          prominence={type === 'intro' ? 'default' : 'strong'}
        >
          {title}
        </Text>
        <Text
          as="p"
          variant="body"
          color="neutral"
          prominence={type === 'intro' ? 'default' : 'stronger'}
        >
          {children}
        </Text>
      </Stack>
      <Stack direction="row" gap={2}>
        {buttonText ? (
          <ButtonV2
            size="medium"
            sentiment={type === 'intro' ? 'primary' : 'neutral'}
            onClick={onClickButton}
          >
            {buttonText}
          </ButtonV2>
        ) : null}
        {linkText && direction === 'column' ? (
          <Link
            variant="primary"
            size="small"
            target="_blank"
            href={linkHref ?? ''}
            prominence={type === 'intro' ? 'default' : 'strong'}
          >
            {linkText}
          </Link>
        ) : null}
      </Stack>
    </Stack>
    <ButtonV2
      icon="close"
      size="small"
      variant={type === 'intro' ? 'ghost' : 'filled'}
      sentiment={type === 'intro' ? 'neutral' : 'primary'}
      onClick={onClose}
    />
  </Container>
)
