import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { Color } from '../../theme'

const bordersStyles = ({
  size,
  colors,
  theme,
}: {
  size: number
  colors: string[]
  theme: Theme
}) => {
  const isHalved = colors.length > 1
  const finalColors = colors?.map(
    bgColor => theme.colors[bgColor as Color]?.backgroundStrong ?? bgColor,
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

const StyledSphere = styled('span', {
  shouldForwardProp: prop => !['size', 'colors'].includes(prop),
})<{ size: number; colors: string[] }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  ${bordersStyles}
`

const StyledTextSphere = styled('span', {
  shouldForwardProp: prop => !['color', 'fontSize'].includes(prop),
})<{ color: string; fontSize?: number }>`
  color: ${({ theme, color }) =>
    theme.colors[color as Color]?.textWeak ?? color};
  font-size: ${({ fontSize = 10 }) => fontSize}px;
`

type SphereProps = {
  size?: number
  colors?: string[]
  text?: string
  textColor?: string
}

const DEFAULT_COLORS = ['primary']

export const Sphere = ({
  size = 32,
  colors = DEFAULT_COLORS,
  text, // Supports only 1 char (star char for instance), that's why we take only first char if long text given
  textColor = 'primary',
}: SphereProps): JSX.Element => (
  <StyledSphere
    size={size}
    colors={colors}
    style={{
      height: size,
      width: size,
    }}
  >
    {text && (
      <StyledTextSphere color={textColor} fontSize={size / 2}>
        {text[0]}
      </StyledTextSphere>
    )}
  </StyledSphere>
)
