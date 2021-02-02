import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors, radii, space } from '../../new_theme'
import { Box } from '../Box'

const variants = {
  success: css`
    background-color: ${colors.success};
  `,
  'light-success': css`
    color: ${colors.success};
    background-color: ${colors.foam};
  `,
  beta: css`
    background-color: ${colors.beta};
  `,
  'light-beta': css`
    color: ${colors.beta};
    background-color: ${colors.serenade};
  `,
  warning: css`
    background-color: ${colors.warning};
  `,
  'light-error': css`
    color: ${colors.red};
    background-color: ${colors.pippin};
  `,
  error: css`
    background-color: ${colors.red};
  `,
  info: css`
    background-color: ${colors.info};
  `,
  'light-info': css`
    color: ${colors.info};
    background-color: ${colors.zumthor};
  `,
  'light-neutral': css`
    color: ${colors.gray550};
    background-color: ${colors.gray100};
  `,
  neutral: css`
    color: ${colors.gray700};
    background-color: ${colors.gray350};
  `,
}

const sizes = {
  rounded: css`
    border-radius: ${radii.large};
    font-size: 10px;
    height: ${space['2']};
    padding: ${space['0.25']} ${space['0.75']};
    text-transform: uppercase;
  `,
  medium: css`
    font-size: 14px;
    line-height: ${space['4']};
    height: ${space['4']};
  `,
  small: css`
    font-size: 12px;
    line-height: ${space['3']};
    height: ${space['3']};
  `,
  xsmall: css`
    border-radius: ${radii.default};
    font-size: 12px;
    line-height: ${space['2.25']};
    height: ${space['2.25']};
  `,
  xxsmall: css`
    border-radius: ${radii.default};
    font-size: 10px;
    line-height: ${space['2']};
    height: ${space['2']};
    padding: 0 ${space['0.75']};
  `,
}

const style = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  white-space: nowrap;
  border-radius: ${space['2']};
  padding: 0 ${space['2']};
  width: fit-content;
`

const Badge = ({ variant, size, ...props }) => (
  <Box as="span" css={[style, variants[variant], sizes[size]]} {...props} />
)

export const badgeVariants = Object.keys(variants)
export const badgeSizes = Object.keys(sizes)

Badge.propTypes = {
  variant: PropTypes.oneOf(badgeVariants),
  size: PropTypes.oneOf(badgeSizes),
}

Badge.defaultProps = {
  variant: 'neutral',
  size: 'medium',
}

export { Badge }
