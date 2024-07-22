import { type Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { Text } from '../Text'
import {
  DEFAULT_COLORS,
  SENTIMENTS,
  SIZES,
  TEXT_VARIANT_BY_SIZE,
} from './constants'
import type { AvatarV2Props, Colors } from './types'

const Container = styled('div', {
  shouldForwardProp: prop => !['image'].includes(prop),
})<{ image?: string }>`
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
        &[data-sentiment="${sentiment}"] {
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
  `

const ElementContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

type SentimentColors =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

const bordersStyles = ({
  size,
  colors,
  theme,
}: {
  size: number
  colors: Colors
  theme: Theme
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
    border-radius: ${theme.radii.circle};
  `
}

const StyledColors = styled('span', {
  shouldForwardProp: prop => !['size', 'colors'].includes(prop),
})<{ size: number; colors: Colors }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  ${bordersStyles}
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
}: AvatarV2Props) => (
  <Container
    data-shape={shape}
    data-size={size}
    data-sentiment={sentiment}
    image={image}
  >
    {variant === 'icon' && (
      <ElementContainer>
        <Icon
          name={icon}
          sentiment="neutral"
          size={size}
          prominence={sentiment === 'primary' ? 'stronger' : 'strong'}
        />
      </ElementContainer>
    )}
    {variant === 'text' && (
      <ElementContainer>
        <Text
          as="span"
          variant={TEXT_VARIANT_BY_SIZE[size]}
          sentiment="neutral"
          prominence={sentiment === 'primary' ? 'stronger' : 'strong'}
        >
          {text}
        </Text>
      </ElementContainer>
    )}
    {variant === 'colors' && (
      <StyledColors
        size={SIZES[size]}
        colors={colors}
        style={{
          height: size,
          width: size,
        }}
      />
    )}
  </Container>
)
