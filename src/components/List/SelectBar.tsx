import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import ActionBar from '../ActionBar'
import Checkbox from '../Checkbox'
import FlexBox from '../FlexBox'
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
  background-color: ${({ theme }) => theme.colorsDeprecated.gray100};
  font-weight: 500;
  color: ${({ theme }) => theme.colorsDeprecated.primary};
`

type ListSelectBarProps = {
  text?: ReactNode | ((length: number) => string)
  children?:
    | ((props: {
        selectedItems: unknown[]
        unselectAll: () => void
      }) => ReactElement)
    | ReactNode
}
const SelectBar: FunctionComponent<ListSelectBarProps> = ({
  children,
  text = count => (count === 1 ? 'item selected' : `items selected`),
  ...props
}) => {
  const { data, idKey, rowsState, unselectAll } = useListContext()

  const selectedItems = data.filter(item => {
    const itemState =
      rowsState[(item as Record<string, keyof typeof rowsState>)[idKey]]

    return itemState && itemState.selected
  })

  // Don't display the pop-in if there aren't an item selected
  return selectedItems.length > 0 ? (
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
      <FlexBox flex={1} justifyContent="flex-end">
        {typeof children === 'function'
          ? children({ selectedItems, unselectAll })
          : children}
      </FlexBox>
    </ActionBar>
  ) : null
}

SelectBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

export default SelectBar
