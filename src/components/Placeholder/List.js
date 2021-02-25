import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import Line from './Line'

const StyledItem = styled(Box)`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 4px 8px;
`

const StyledList = styled(Box)`
  list-style: none;
  padding: 0;
  margin: 0;

  > ${StyledItem}:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`

const Item = () => (
  <StyledItem as="li">
    <Box width={240}>
      <Line />
    </Box>
    <Box width={360}>
      <Line />
    </Box>
  </StyledItem>
)

const List = ({ length, ...props }) => (
  <StyledList as="ul" {...props}>
    {Array.from({ length }, (_, i) => (
      <Item key={`placeholder-list-${i}`} />
    ))}
  </StyledList>
)

List.propTypes = {
  length: PropTypes.number,
}

List.defaultProps = {
  length: 2,
}

export default List
