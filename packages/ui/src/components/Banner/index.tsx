'use client'

import type { Theme } from '@emotion/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { CloseIcon } from '@ultraviolet/icons'
import type { ComponentProps, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Button } from '../Button'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'
import defaultIllustration from './assets/default-image.svg'
import defaultIllustrationSmall from './assets/default-image-small.svg'

type Variant = 'intro' | 'promotional'
type Size = 'small' | 'medium'

const styles = ({
  theme,
  variant,
  size,
}: {
  theme: Theme
  variant: Variant
  size: Size
}) => {
  if (size === 'small') {
    if (variant === 'intro') {
      return css`
        background: ${theme.colors.primary.background};
        background-position: left, right;
        background-repeat: no-repeat, no-repeat;
        background-size: contain, contain;
      `
    }

    if (variant === 'promotional') {
      return css`
        background-position: left, right;
        background-image: ${theme.colors.other.gradients.background.linear.aqua};
        background-repeat: no-repeat, no-repeat;
        background-size: contain, contain;
      `
    }
  }

  if (size === 'medium') {
    if (variant === 'intro') {
      return css`
        background: ${theme.colors.primary.background};
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
      `
    }

    if (variant === 'promotional') {
      return css`
        background-image: ${theme.colors.other.gradients.background.linear.aqua};
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
      `
    }
  }

  return null
}

const Container = styled('div', {
  shouldForwardProp: prop => !['variant', 'size', 'padding'].includes(prop),
})<{ variant: Variant; size: Size }>`
  padding: ${({ theme, size }) => theme.space[size === 'small' ? '2' : '3']};
  border-radius: ${({ theme }) => theme.radii.large};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['2']};
  ${({ theme, variant, size }) => styles({ size, theme, variant })};

  > svg:first-child,
  > img {
    height: ${({ size }) => (size === 'medium' ? '140px' : '100px')};
    align-self: center;
  }

  button[name="close"] {
    background: none;

    &:hover {
      background: none;
    }
  }
`

const ImageStack = styled(Stack, {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Size }>`
  width: ${({ size }) => (size === 'medium' ? '140px' : '74px')};
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
  /**
   * Set the image to be displayed on the left side of the banner. If not provided, a default image will be displayed.
   * You can provide the url of the image it will be displayed as an img tag or a ReactNode to be displayed as is.
   */
  image?: ReactNode
  closable?: boolean
  className?: string
  ['data-testid']?: string
}

/**
 * Banner component is used to display an informative message to the user with style.
 */
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
  closable = true,
  'data-testid': dataTestId,
}: BannerProps) => {
  const { theme } = useTheme()
  const defaultImage =
    size === 'small' ? defaultIllustrationSmall : defaultIllustration

  const prominence = useMemo(() => {
    if (variant === 'promotional') {
      return 'strong'
    }

    if (theme === 'dark' || theme === 'darker') {
      return 'stronger'
    }

    return 'default'
  }, [variant, theme])

  const [opened, setOpened] = useState(true)

  if (!opened) return null

  return (
    <Container
      className={className}
      data-testid={dataTestId}
      size={size}
      variant={variant}
    >
      {image ? (
        <ImageStack justifyContent="center" size={size}>
          {typeof image === 'string' ? <img alt="" src={image} /> : image}
        </ImageStack>
      ) : (
        <ImageStack justifyContent="center" size={size}>
          <img alt="" src={defaultImage} />
        </ImageStack>
      )}
      <Stack
        alignItems={direction === 'column' ? 'start' : 'center'}
        direction={direction}
        gap={2}
        justifyContent="space-between"
        style={{ flex: 1 }}
      >
        <Stack gap={0.5} justifyContent="center" style={{ flex: 1 }}>
          <Text
            as="p"
            prominence={variant === 'intro' ? 'default' : 'strong'}
            sentiment={variant === 'promotional' ? 'white' : 'primary'}
            variant={size === 'medium' ? 'headingSmall' : 'bodyStronger'}
          >
            {title}
          </Text>
          <Text
            as="p"
            sentiment={
              variant === 'promotional' || theme !== 'light'
                ? 'white'
                : 'neutral'
            }
            variant="body"
          >
            {children}
          </Text>
        </Stack>
        {buttonText || linkText ? (
          <Stack alignItems="center" direction="row" gap={2}>
            {buttonText ? (
              <Button
                onClick={onClickButton}
                sentiment={variant === 'intro' ? 'primary' : 'white'}
                size="medium"
                variant="filled"
              >
                {buttonText}
              </Button>
            ) : null}
            {linkText ? (
              <Link
                href={linkHref ?? ''}
                prominence={prominence}
                sentiment={
                  theme === 'light' && variant !== 'promotional'
                    ? 'primary'
                    : undefined
                }
                size="small"
                target="_blank"
              >
                {linkText}
              </Link>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
      {closable ? (
        <Button
          name="close"
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
          sentiment={
            variant === 'intro' ||
            (variant === 'promotional' && theme !== 'light')
              ? 'neutral'
              : 'primary'
          }
          size="small"
          variant={variant === 'intro' ? 'ghost' : 'filled'}
        >
          <CloseIcon />
        </Button>
      ) : null}
    </Container>
  )
}
