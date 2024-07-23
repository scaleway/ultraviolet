import { type Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon, ProductIcon } from '@ultraviolet/icons'
import { Text } from '../Text'
import {
  DEFAULT_COLORS,
  ICON_SIZES,
  SENTIMENTS,
  SIZES,
  TEXT_VARIANT_BY_SIZE,
} from './constants'
import type { AvatarV2Props, Colors, SentimentColors, Shape } from './types'

const UploadContainer = styled.div`
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
    border-radius: ${({ theme }) => theme.radii.xlarge}
  }
`

const Container = styled('div', {
  shouldForwardProp: prop => !['image'].includes(prop),
})<{ image?: string }>`
    position: relative;
    &[data-shape='circle'] {
      border-radius: ${({ theme }) => theme.radii.circle}
    }

    &[data-shape='square'] {
      border-radius: ${({ theme }) => theme.radii.xlarge}
    }

    ${Object.entries(SIZES)
      .map(
        ([key, size]) => `
          &[data-size="${key}"] {
            width: ${size}px;
            height: ${size}px;
          }
    `,
      )
      .join('')}

    ${({ theme }) =>
      SENTIMENTS.map(
        sentiment => `
          &[data-is-user='false'][data-sentiment="${sentiment}"] {
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
  size: number
  colors: Colors
  theme: Theme
  shape: Shape
}) => {
  const isHalved = colors.length > 1
  const finalColors = colors?.map(
    bgColor =>
      theme.colors[bgColor as SentimentColors]?.backgroundStrong ?? bgColor,
  )

  return css`
    border-left: ${size / 2}px solid ${finalColors[0]};
    border-top: ${size / 2}px solid ${finalColors[0]};
    border-right: ${size / 2}px solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-bottom: ${size / 2}px solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-radius: ${shape === 'circle' ? theme.radii.circle : theme.radii.xlarge};
  `
}

const StyledColors = styled('span', {
  shouldForwardProp: prop => !['size', 'colors', 'shape'].includes(prop),
})<{ size: number; colors: Colors; shape: Shape }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  ${bordersStyles}
`

const ProductIconContainer = styled.div`
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
    border-radius: ${({ theme }) => theme.radii.xlarge}
  }

  ${Object.entries(SIZES)
    .map(
      ([key, size]) => `
        &[data-size="${key}"] {
          width: ${size}px;
          height: ${size}px;

          & > svg {
            width: ${size}px;
            height: ${size}px;
          }
        }
  `,
    )
    .join('')}
`

export const AvatarV2 = ({
  shape,
  variant,
  image,
  icon,
  text,
  size = 'medium',
  sentiment = 'primary',
  colors = DEFAULT_COLORS,
  upload,
  onClick,
}: AvatarV2Props) => (
  <Container
    data-shape={shape}
    data-size={size}
    data-sentiment={sentiment}
    data-upload={upload}
    data-is-user={variant === 'user'}
    image={image}
    onClick={onClick}
  >
    {upload ? (
      <UploadContainer data-shape={shape}>
        <Icon
          name="upload"
          size="large"
          sentiment="neutral"
          prominence="stronger"
        />
      </UploadContainer>
    ) : null}
    {variant === 'user' ? (
      <ProductIconContainer data-shape={shape} data-size={size}>
        <ProductIcon name="user" />
      </ProductIconContainer>
    ) : null}
    {variant === 'icon' ? (
      <ElementContainer data-shape={shape}>
        <Icon
          name={icon}
          sentiment="neutral"
          size={ICON_SIZES[size]}
          prominence={sentiment === 'primary' ? 'stronger' : 'strong'}
        />
      </ElementContainer>
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
        size={SIZES[size]}
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
