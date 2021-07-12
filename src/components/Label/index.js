import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const StyledLabel = styled(Box)`
  color: ${({ theme }) => theme.colors.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

const Label = props => <StyledLabel {...props} />

Label.propTypes = {
  as: PropTypes.string,
}

Label.defaultProps = {
  as: 'label',
}

export default Label
