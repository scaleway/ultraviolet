import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

const borderedStyles = ({ theme }) => css`
  padding: ${theme.space['3']};
  border-radius: ${theme.radii.default};
  border: 1px solid ${theme.colors.gray350};
`

const StyledBox = styled(x.div, {
  shouldForwardProp: prop => !['bordered'].includes(prop),
})`
  ${({ bordered }) => (bordered ? borderedStyles : null)}
`
const Box = forwardRef(({ width, height, bordered, ...props }, ref) => (
  <StyledBox ref={ref} w={width} h={height} bordered={bordered} {...props} />
))

Box.withComponent = element => props => <Box as={element} {...props} />

Box.defaultProps = {
  bordered: false,
  height: undefined,
  width: undefined,
}

Box.propTypes = {
  bordered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
