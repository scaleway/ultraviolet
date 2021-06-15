import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import ActionBar from '../ActionBar'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Typography from '../Typography'
import { useListContext } from './context'

const StyledCheckbox = styled(Checkbox)`
  justify-content: center;
  display: flex;
`

const StyledItemsCount = styled.div`
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray100};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`

const SelectBar = ({ children, text, ...props }) => {
  const { data, idKey, rowsState, unselectAll } = useListContext()

  const selectedItems = data.filter(item => {
    const itemState = rowsState[item[idKey]]

    return itemState && itemState.selected
  })

  // Don't display the pop-in if there aren't an item selected
  return (
    !!selectedItems.length && (
      <ActionBar {...props} role="dialog" aria-modal="true">
        <StyledCheckbox
          size={20}
          checked
          mr={2}
          onChange={unselectAll}
          autoFocus
        />
        <StyledItemsCount>{selectedItems.length}</StyledItemsCount>
        <Typography color="primary" fontWeight={500} ml={1}>
          {typeof text === 'function' ? text(selectedItems.length) : text}
        </Typography>
        <Box display="flex" flex={1} justifyContent="flex-end">
          {children({ selectedItems, unselectAll })}
        </Box>
      </ActionBar>
    )
  )
}

SelectBar.propTypes = {
  children: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

SelectBar.defaultProps = {
  text: count => (count === 1 ? 'item selected' : `items selected`),
}

export default SelectBar
