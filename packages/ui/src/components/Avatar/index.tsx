'use client'

import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { UploadIcon } from '@ultraviolet/icons'
import { UserProductIcon } from '@ultraviolet/icons/product'
import { Text } from '../Text'
import {
  DEFAULT_COLORS,
  RADIUS_SIZES,
  SENTIMENTS,
  sizes,
  TEXT_VARIANT_BY_SIZE,
} from './constants'
import type { AvatarProps, Colors, SentimentColors, Shape } from './types'

const UploadContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: keyof ReturnType<typeof sizes> }>`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 180ms ease-in-out, background-color 180ms ease-in-out;

  &[data-shape='circle'] {
    border-radius: ${({ theme }) => theme.radii.circle}
  }

  &[data-shape='square'] {
    border-radius: ${({ theme, size }) => theme.radii[RADIUS_SIZES[size]]}
  }
`

const Container = styled('div', {
  shouldForwardProp: prop => !['image', 'size', 'sentiment'].includes(prop),
})<{ image?: string; size: keyof ReturnType<typeof sizes>; sentiment: string }>`
    position: relative;
    &[data-shape='circle'] {
      border-radius: ${({ theme }) => theme.radii.circle}
    }

    &[data-shape='square'] {
      border-radius: ${({ theme, size }) => theme.radii[RADIUS_SIZES[size]]}
    }

    color: ${({ theme, sentiment }) => (sentiment === 'neutral' ? theme.colors.neutral.text : theme.colors.neutral.textStronger)};

    ${({ theme }) =>
      Object.entries(sizes(theme))
        .map(
          ([key, size]) => `
          &[data-size="${key}"] {
            width: ${size};
            height: ${size};
          }
    `,
        )
        .join('')}

    ${({ theme }) =>
      SENTIMENTS.map(
        sentiment => `
          &[data-has-background='true'][data-sentiment="${sentiment}"] {
            background-color: ${theme.colors[sentiment].backgroundStrong};
          }
      `,
      ).join('')}

    ${({ image }) =>
      image &&
      `
        background-image: url(${image});
        background-size: cover;
    `}

    &:hover {
      ${UploadContainer} {
        opacity: 1;
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.overlay};
      }
    }
  `

const ElementContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &[data-shape='circle'] {
    border-radius: ${({ theme }) => theme.radii.circle}
  }

  &[data-shape='square'] {
    border-radius: ${({ theme }) => theme.radii.xlarge}
  }
`

const bordersStyles = ({
  size,
  colors,
  theme,
  shape,
}: {
  size: keyof ReturnType<typeof sizes>
  colors: Colors
  theme: Theme
  shape: Shape
}) => {
  const isHalved = colors.length > 1
  const finalColors = colors?.map(
    bgColor =>
      theme.colors[bgColor as SentimentColors]?.backgroundStrong ?? bgColor,
  )

  const finalSize = sizes(theme)[size]

  return css`
    border-left: calc(${finalSize} / 2) solid ${finalColors[0]};
    border-top: calc(${finalSize} / 2) solid ${finalColors[0]};
    border-right: calc(${finalSize} / 2) solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-bottom: calc(${finalSize} / 2) solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-radius: ${shape === 'circle' ? theme.radii.circle : theme.radii[RADIUS_SIZES[size]]}};
  `
}

const StyledColors = styled('span', {
  shouldForwardProp: prop => !['size', 'colors', 'shape'].includes(prop),
})<{ size: keyof ReturnType<typeof sizes>; colors: Colors; shape: Shape }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  ${bordersStyles}
`

const ProductIconContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: keyof ReturnType<typeof sizes> }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &[data-shape='circle'] {
    border-radius: ${({ theme }) => theme.radii.circle}
  }

  &[data-shape='square'] {
    border-radius: ${({ theme, size }) => theme.radii[RADIUS_SIZES[size]]}
  }

  ${({ theme }) =>
    Object.entries(sizes(theme))
      .map(
        ([key, size]) => `
        &[data-size="${key}"] {
          width: ${size};
          height: ${size};

          & > svg {
            width: ${size};
            height: ${size};
          }
        }
  `,
      )
      .join('')}
`

/**
 * The Avatar component is used to represent a user, product, or entity. It can be used to display an image, an icon, a text or a set of colors.
 */
export const Avatar = ({
  shape,
  variant,
  image,
  text,
  size = 'medium',
  sentiment = 'primary',
  colors = DEFAULT_COLORS,
  upload,
  onClick,
  className,
  children,
  'data-testid': dataTestId,
}: AvatarProps) => (
  <Container
    data-shape={shape}
    data-size={size}
    data-sentiment={sentiment}
    data-upload={upload}
    data-has-background={!['user', 'image'].includes(variant)}
    image={image}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    size={size}
    className={className}
    data-testid={dataTestId}
    sentiment={sentiment}
  >
    {upload ? (
      <UploadContainer data-shape={shape} size={size}>
        <UploadIcon size="large" sentiment="neutral" prominence="stronger" />
      </UploadContainer>
    ) : null}
    {variant === 'user' ? (
      <ProductIconContainer data-shape={shape} data-size={size} size={size}>
        <UserProductIcon />
      </ProductIconContainer>
    ) : null}
    {variant === 'icon' ? (
      <ElementContainer data-shape={shape}>{children}</ElementContainer>
    ) : null}
    {variant === 'text' ? (
      <ElementContainer data-shape={shape}>
        <Text
          as="span"
          variant={TEXT_VARIANT_BY_SIZE[size]}
          sentiment="neutral"
          prominence={sentiment === 'primary' ? 'stronger' : 'strong'}
        >
          {text}
        </Text>
      </ElementContainer>
    ) : null}
    {variant === 'colors' ? (
      <StyledColors
        size={size}
        colors={colors}
        shape={shape}
        style={{
          height: size,
          width: size,
        }}
      />
    ) : null}
  </Container>
)
