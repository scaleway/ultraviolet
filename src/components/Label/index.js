import styled from '@emotion/styled'
import Box from '../Box'

const Label = styled(Box)`
  color: ${({ theme }) => theme.colors.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

Label.defaultProps = {
  as: 'label',
}

export default Label
