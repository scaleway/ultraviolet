import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'theme'
import { Box } from 'components/Box'

const styles = {
  sphere: ({ size, bgColors }) => {
    const isHalved = bgColors.length > 1
    return css`
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
    `
  },
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
  ...props
}) => (
  <Box
    css={styles.sphere({ size, bgColors })}
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
  bgColors: [theme.violet],
  text: undefined,
  textColor: theme.white,
  textSize: 16,
}

Sphere.propTypes = {
  size: PropTypes.number,
  bgColors: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
}

export default Sphere
