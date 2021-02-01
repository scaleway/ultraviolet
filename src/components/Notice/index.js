import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../new_theme'
import { Box } from '../Box'
import { Icon } from '../Icon'

const style = css`
  color: ${colors.gray550};
  font-size: 12px;
  line-height: 20px;
`

const Notice = ({ children, ...props }) => (
  <Box css={style} role="alert" {...props}>
    <Icon name="information-outline" verticalAlign="top" mr={1} size={20} />
    {children}
  </Box>
)

Notice.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Notice }
