import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { ListOrder } from './types'

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

type AriaSortType = 'none' | 'descending' | 'ascending' | 'other' | undefined

const SortIcon = ({
  active,
  order,
}: {
  active?: boolean
  order?: ListOrder
}) => {
  let ariaSort: AriaSortType = 'none'
  if (active) {
    ariaSort = order === 'desc' ? 'descending' : 'ascending'
  }

  return (
    <StyledContainer aria-sort={ariaSort}>
      <UpIcon
        title="ascending"
        color={active && order === 'asc' ? 'primary' : 'gray550'}
        size={10}
        name="arrow-up"
      />
      <DownIcon
        title="descending"
        color={active && order === 'desc' ? 'primary' : 'gray550'}
        size={10}
        name="arrow-down"
      />
    </StyledContainer>
  )
}

SortIcon.propTypes = {
  active: PropTypes.bool,
  order: PropTypes.oneOf(['asc', 'desc']),
}

export default SortIcon
