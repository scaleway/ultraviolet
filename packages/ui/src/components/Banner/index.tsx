'use client'

import { CloseIcon } from '@ultraviolet/icons'
import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Button } from '../Button'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'
import defaultIllustration from './assets/default-image.svg'
import defaultIllustrationSmall from './assets/default-image-small.svg'
import type { BannerVariants } from './styles.css'
import { banner, closeButtonBanner, imageStackBanner } from './styles.css'

type BannerProps = {
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
  'data-testid'?: string
  style?: CSSProperties
} & BannerVariants

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
  style,
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

  if (!opened) {
    return null
  }

  return (
    <Stack
      className={`${className ? `${className} ` : ''}${banner({ size, variant })}`}
      data-testid={dataTestId}
      direction="row"
      gap={2}
      justifyContent="space-between"
      style={style}
    >
      {image ? (
        <Stack className={imageStackBanner[size]} justifyContent="center">
          {typeof image === 'string' ? <img alt="" src={image} /> : image}
        </Stack>
      ) : (
        <Stack className={imageStackBanner[size]} justifyContent="center">
          <img alt="" src={defaultImage} />
        </Stack>
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
                sentiment="primary"
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
          className={closeButtonBanner}
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
    </Stack>
  )
}
