'use client'

import type { ReactNode } from 'react'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { SizesTypes } from './styles.css'
import { emptyStateContainer, emptyStateImage, paddedStack } from './styles.css'

type EmptyStateProps = {
  title?: string
  description: ReactNode
  /**
   * Container size will be same on `small` and `medium`
   * only the image size will change on those properties.
   * `small` and `medium` container is 720px wide
   * `large` container is 1080px wide
   */
  size?: SizesTypes
  /**
   * You can give the path of an image or a component that will render an image.
   */
  image?: ReactNode
  primaryButton?: ReactNode
  secondaryButton?: ReactNode
  learnMore?: {
    link: string
    text: string
    target?: string
  }
  bordered?: boolean
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

/**
 * EmptyState component is used to display a message when there is no data to show.
 */
export const EmptyState = ({
  image,
  title,
  size = 'large',
  description,
  primaryButton,
  secondaryButton,
  learnMore,
  className,
  bordered,
  children,
  'data-testid': dataTestId,
}: EmptyStateProps) => (
  <Stack
    className={`${className ? `${className} ` : ''}${emptyStateContainer({ bordered, size })}`}
    data-testid={dataTestId}
  >
    <Stack
      alignItems="center"
      className={paddedStack}
      gap={size === 'small' ? 2 : 3}
      justifyContent="center"
    >
      <Stack alignItems="center" gap={2} justifyContent="center">
        {image && typeof image === 'string' ? (
          <img alt="" className={emptyStateImage[size]} src={image} />
        ) : (
          image
        )}
        <Stack alignItems="center" gap={0.5}>
          {title ? (
            <Text
              as="h2"
              placement="center"
              prominence="strong"
              variant={size === 'small' ? 'bodyStrong' : 'headingSmall'}
            >
              {title}
            </Text>
          ) : null}
          <Text
            as="p"
            placement="center"
            variant={size === 'small' ? 'bodySmall' : 'body'}
          >
            {description}
          </Text>
        </Stack>
      </Stack>
      <Stack alignItems="center" gap={2} justifyContent="center">
        <Stack direction="row" gap={2}>
          {secondaryButton}
          {primaryButton}
        </Stack>
        {learnMore?.text ? (
          <Link
            href={learnMore.link}
            iconPosition="right"
            size={size === 'small' ? 'small' : undefined}
            target={learnMore.target}
          >
            {learnMore.text}
          </Link>
        ) : null}
      </Stack>
      {children}
    </Stack>
  </Stack>
)
