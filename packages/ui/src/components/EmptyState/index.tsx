'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'

const CONTAINER_SIZES = {
  small: 45, // in rem
  medium: 45,
  large: 71.25,
} as const

type SizesTypes = keyof typeof CONTAINER_SIZES

const IMAGE_SIZES: Record<SizesTypes, number> = {
  small: 4, // in rem
  medium: 6,
  large: 15,
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
    size={size}
    bordered={bordered}
    className={className}
    data-testid={dataTestId}
  >
    <StyledStack
      gap={size === 'small' ? 2 : 3}
      justifyContent="center"
      alignItems="center"
    >
      <Stack gap={2} justifyContent="center" alignItems="center">
        {image && typeof image === 'string' ? (
          <Image size={IMAGE_SIZES[size]} alt="" src={image} />
        ) : (
          image
        )}
        <Stack gap={0.5} alignItems="center">
          {title ? (
            <CenteredText
              as="h2"
              variant={size === 'small' ? 'bodyStrong' : 'headingSmall'}
              prominence="strong"
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
      <Stack gap={2} justifyContent="center" alignItems="center">
        <Stack direction="row" gap={2}>
          {secondaryButton}
          {primaryButton}
        </Stack>
        {learnMore?.text ? (
          <Link
            href={learnMore.link}
            target={learnMore.target}
            iconPosition="right"
            size={size === 'small' ? 'small' : undefined}
          >
            {learnMore.text}
          </Link>
        ) : null}
      </Stack>
      {children}
    </StyledStack>
  </Container>
)
