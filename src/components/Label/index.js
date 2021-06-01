import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Box from '../Box'

const Label = styled(Box)`
  color: ${({ theme }) => theme.colors.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

Label.propTypes = {
  as: PropTypes.string,
}

Label.defaultProps = {
  as: 'label',
}

export default Label
