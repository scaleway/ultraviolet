import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 8px;
  height: 16px;
  width: 10px;
`
const UpIcon = styled(Icon)`
  position: absolute;
  top: 0;
`

const DownIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
`

const SortIcon = ({ active, order }) => {
  let ariaSort = 'none'
  if (active) {
    ariaSort = order === 'desc' ? 'descending' : 'ascending'
  }

  return (
    <StyledContainer aria-sort={ariaSort}>
      <UpIcon
        color={active && order === 'asc' ? 'primary' : 'gray550'}
        size={10}
        name="arrow-up"
        title="ascending"
      />
      <DownIcon
        color={active && order === 'desc' ? 'primary' : 'gray550'}
        size={10}
        name="arrow-down"
        title="descending"
      />
    </StyledContainer>
  )
}

SortIcon.propTypes = {
  active: PropTypes.bool,
  order: PropTypes.oneOf(['asc', 'desc']),
}

SortIcon.defaultProps = {
  active: false,
  order: undefined,
}

export default SortIcon
