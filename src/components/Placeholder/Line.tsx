import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Box from '../Box'

const sizes = [80, 120, 160, 200]

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

const Line = styled(Box, {
  shouldForwardProp: prop => !['width'].includes(prop.toString()),
})<{ width?: number }>`
  height: 12px;
  width: ${({ width }) => width ?? randomSize()}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutral.background};
`

Line.propTypes = {
  width: PropTypes.number,
}

export default Line
