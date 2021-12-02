import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Color } from '../../theme/colors'
import Box from '../Box'

const bordersStyles = ({
  size,
  bgColors,
  theme,
}: {
  size: number
  bgColors: string[]
  theme: Theme
}) => {
  const isHalved = bgColors.length > 1
  const finalColors = bgColors?.map(
    bgColor => theme.colorsDeprecated[bgColor as Color] ?? bgColor,
  )

  return css`
    border-left: ${size / 2}px solid ${finalColors[0]};
    border-top: ${size / 2}px solid ${finalColors[0]};
    border-right: ${size / 2}px solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-bottom: ${size / 2}px solid
      ${isHalved ? finalColors[1] : finalColors[0]};
    border-radius: 50%;
  `
}

const StyledSphere = styled(Box, {
  shouldForwardProp: prop => !['size', 'bgColors'].includes(prop.toString()),
})<{ size: number; bgColors: string[] }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  ${bordersStyles}
`

const StyledTextSphere = styled('div', {
  shouldForwardProp: prop => !['color', 'fontSize'].includes(prop.toString()),
})<{ color: string; fontSize?: number }>`
  color: ${({ theme, color }) =>
    theme.colorsDeprecated[color as Color] ?? color};
  font-size: ${({ fontSize = 10 }) => fontSize}px;
`

type SphereProps = {
  size?: number
  bgColors?: string[]
  text?: string
  textColor?: string
  textSize?: number
}

const Sphere = ({
  size = 32,
  bgColors = ['violet'],
  text, // Supports only 1 char (star char for instance), that's why we take only first char if long text given
  textColor = 'white',
  textSize = 16,
  ...props
}: SphereProps): JSX.Element => (
  <StyledSphere
    size={size}
    bgColors={bgColors}
    width={size}
    height={size}
    position="relative"
    {...props}
  >
    {text && (
      <StyledTextSphere color={textColor} fontSize={textSize}>
        {text[0]}
      </StyledTextSphere>
    )}
  </StyledSphere>
)

Sphere.propTypes = {
  bgColors: PropTypes.arrayOf(PropTypes.string.isRequired),
  size: PropTypes.number,
  text: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
}

export default Sphere
