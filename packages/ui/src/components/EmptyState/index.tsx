import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'

const CONTAINER_SIZES = {
  small: 720,
  medium: 720,
  large: 1140,
} as const

type SizesTypes = keyof typeof CONTAINER_SIZES

const IMAGE_SIZES: Record<SizesTypes, number> = {
  small: 64,
  medium: 96,
  large: 240,
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
  max-width: ${({ size }) => CONTAINER_SIZES[size]}px;
  margin: 0 auto;
  ${({ size }) => (size === 'large' ? 'padding: 0 140px' : null)};
  ${({ theme, bordered }) =>
    bordered
      ? `
    border: 1px solid ${theme.colors.neutral.borderStrong};
    border-radius: ${theme.radii.default};
    `
      : null};
`

const StyledStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['5']};
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
}

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
}: EmptyStateProps) => (
  <Container size={size} bordered={bordered} className={className}>
    <StyledStack gap={3} justifyContent="center" alignItems="center">
      <Stack gap={2} justifyContent="center" alignItems="center">
        {image && typeof image === 'string' ? (
          <img width={IMAGE_SIZES[size]} alt="" src={image} />
        ) : (
          image
        )}
        <Stack gap={0.5} alignItems="center">
          {title ? (
            <CenteredText as="h2" variant="headingSmall" prominence="strong">
              {title}
            </CenteredText>
          ) : null}
          <CenteredText as="p" variant="body">
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
            variant="info"
            iconPosition="right"
          >
            {learnMore.text}
          </Link>
        ) : null}
      </Stack>
      {children}
    </StyledStack>
  </Container>
)
