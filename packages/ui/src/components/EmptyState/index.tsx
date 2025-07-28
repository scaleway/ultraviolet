'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'

const CONTAINER_SIZES = {
  large: 71.25,
  medium: 45,
  small: 45, // in rem
} as const

type SizesTypes = keyof typeof CONTAINER_SIZES

const IMAGE_SIZES: Record<SizesTypes, number> = {
  large: 15,
  medium: 6,
  small: 4, // in rem
}

const CenteredText = styled(Text)`
  text-align: center;
`

const Container = styled(Stack, {
  shouldForwardProp: prop => !['size', 'bordered'].includes(prop),
})<{
  size: SizesTypes
  bordered?: boolean
}>`
  max-width: ${({ size }) => CONTAINER_SIZES[size]}rem;
  margin: 0 auto;
  ${({ size }) => (size === 'large' ? 'padding: 0 8.75rem' : null)};
  ${({ theme, bordered }) =>
    bordered
      ? `
    border: 1px solid ${theme.colors.neutral.border};
    border-radius: ${theme.radii.default};
    `
      : null};
`

const StyledStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['5']};
`

const Image = styled('img')<{ size: number }>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  object-fit: contain;
`

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
  <Container
    bordered={bordered}
    className={className}
    data-testid={dataTestId}
    size={size}
  >
    <StyledStack
      alignItems="center"
      gap={size === 'small' ? 2 : 3}
      justifyContent="center"
    >
      <Stack alignItems="center" gap={2} justifyContent="center">
        {image && typeof image === 'string' ? (
          <Image alt="" size={IMAGE_SIZES[size]} src={image} />
        ) : (
          image
        )}
        <Stack alignItems="center" gap={0.5}>
          {title ? (
            <CenteredText
              as="h2"
              prominence="strong"
              variant={size === 'small' ? 'bodyStrong' : 'headingSmall'}
            >
              {title}
            </CenteredText>
          ) : null}
          <CenteredText
            as="p"
            variant={size === 'small' ? 'bodySmall' : 'body'}
          >
            {description}
          </CenteredText>
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
    </StyledStack>
  </Container>
)
