import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const bordersStyles = ({ size, bgColors, theme }) => {
  const isHalved = bgColors.length > 1
  const finalColors = bgColors?.map(bgColor => theme.colors[bgColor] ?? bgColor)

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
  shouldForwardProp: prop => !['size', 'bgColors'].includes(prop),
})`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  ${bordersStyles}
`

const StyledTextSphere = styled('div', {
  shouldForwardProp: prop => !['color', 'fontSize'].includes(prop),
})`
  color: ${({ theme, color }) => theme.colors[color] ?? color};
  font-size: ${({ fontSize = 10 }) => fontSize}px;
`

const Sphere = ({
  size,
  bgColors,
  text, // Supports only 1 char (star char for instance), that's why we take only first char if long text given
  textColor,
  textSize,
  ...props
}) => (
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

Sphere.defaultProps = {
  bgColors: ['violet'],
  size: 32,
  text: undefined,
  textColor: 'white',
  textSize: 16,
}

Sphere.propTypes = {
  bgColors: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.number,
  text: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
}

export default Sphere
