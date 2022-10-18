import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
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
  const theme = useTheme()

  let ariaSort: AriaSortType = 'none'
  if (active) {
    ariaSort = order === 'desc' ? 'descending' : 'ascending'
  }

  return (
    <StyledContainer aria-sort={ariaSort}>
      <UpIcon
        color={
          active && order === 'asc' ? 'primary' : theme.colors.neutral.textWeak
        }
        size={10}
        name="arrow-up"
        data-testid="arrow-up-icon"
      />
      <DownIcon
        color={
          active && order === 'desc' ? 'primary' : theme.colors.neutral.textWeak
        }
        size={10}
        name="arrow-down"
        data-testid="arrow-down-icon"
      />
    </StyledContainer>
  )
}

export default SortIcon
