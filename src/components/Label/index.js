import styled from '@emotion/styled'
import { theme } from '../../theme'
import { Box } from '../Box'

const Label = styled(Box)`
  color: ${theme.gray950};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`

Label.defaultProps = {
  as: 'label',
}

export { Label }
