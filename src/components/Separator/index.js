import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'
import { Icon, icons } from '../Icon'

const styles = {
  hr: ({ direction, color, thickness, icon }) => {
    const thicknessValue = `${thickness}px`
    return css`
      margin: 0;
      border: 0;
      width: ${direction === 'vertical' ? thicknessValue : 'auto'};
      height: ${direction === 'horizontal' ? thicknessValue : 'auto'};
      flex-shrink: 0;
      background-color: ${colors[color] ?? color};
      ${icon && 'flex: 1'};
    `
  },
  icon: ({ direction }) => css`
    display: flex;
    flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
    align-items: center;
  `,
}

export function Separator({ direction, thickness, color, icon, ...props }) {
  if (icon) {
    return (
      <Box css={styles.icon({ direction })} {...props}>
        <Box
          as="hr"
          css={styles.hr({ direction, thickness, color })}
          flex="1"
        />
        <Icon name={icon} size={24} my={1} color="gray350" />
        <Box
          as="hr"
          css={styles.hr({ direction, thickness, color })}
          flex="1"
        />
      </Box>
    )
  }
  return (
    <Box as="hr" css={styles.hr({ direction, thickness, color })} {...props} />
  )
}

Separator.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  thickness: PropTypes.number,
  icon: PropTypes.oneOf(icons),
  color: PropTypes.string,
}

Separator.defaultProps = {
  direction: 'horizontal',
  thickness: 1,
  icon: null,
  color: 'gray200',
}
