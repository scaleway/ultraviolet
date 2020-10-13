import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'theme'

const styles = {
  sphere: ({ size, bgColors, isHalved }) => css`
    align-items: center;
    border-left: ${size / 2}px solid ${bgColors[0]};
    border-top: ${size / 2}px solid ${bgColors[0]};
    border-right: ${size / 2}px solid ${isHalved ? bgColors[1] : bgColors[0]};
    border-bottom: ${size / 2}px solid ${isHalved ? bgColors[1] : bgColors[0]};
    border-radius: 50%;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  `,
  textSphere: ({ textColor, textSize = 10 }) => css`
    color: ${textColor};
    font-size: ${textSize}px;
  `,
}

export const Sphere = ({
  size,
  bgColors,
  text, // Supports only 1 char (star char for instance), that's why we take only first char if long text given
  textColor,
  textSize,
  isHalved = false,
  ...props
}) => (
  <Box
    css={styles.sphere({ size, bgColors, isHalved })}
    width={size}
    height={size}
    position="relative"
    {...props}
  >
    {text && (
      <div
        css={styles.textSphere({
          textColor,
          textSize,
        })}
      >
        {text[0]}
      </div>
    )}
  </Box>
)

Sphere.defaultProps = {
  size: 32,
  bgColors: [violet({})],
  text: undefined,
  isHalved: false,
}

Sphere.propTypes = {
  size: PropTypes.number,
  bgColors: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  isHalved: PropTypes.bool,
}

export default Sphere
