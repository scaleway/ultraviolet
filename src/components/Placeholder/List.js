import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Line from './Line'

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 4px 8px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  > ${StyledItem}:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`

const Item = () => (
  <StyledItem>
    <div style={{ width: '240px' }}>
      <Line />
    </div>
    <div style={{ width: '360px' }}>
      <Line />
    </div>
  </StyledItem>
)

const List = ({ length }) => (
  <StyledList>
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
