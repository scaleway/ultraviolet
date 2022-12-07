import styled from '@emotion/styled'
import { ReactNode } from 'react'
import ActionBar from '../ActionBar'
import Checkbox from '../Checkbox'
import Text from '../Text'
import { useListContext } from './context'

const StyledCheckbox = styled(Checkbox)`
  justify-content: center;
  display: flex;
  margin-right: ${({ theme }) => theme.space['2']};
`

const StyledItemsCount = styled.div`
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.text};
`

const MargedText = styled(Text)`
  margin-left: ${({ theme }) => theme.space['1']};
`

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

export type ListSelectBarProps<T> = {
  text?: ReactNode | ((length: number) => string)
  children?:
    | ((props: { selectedItems: T[]; unselectAll: () => void }) => ReactNode)
    | ReactNode
}
function SelectBar<T extends Record<string, unknown>>({
  children,
  text = count => (count === 1 ? 'item selected' : `items selected`),
  ...props
}: ListSelectBarProps<T>) {
  const { data, idKey, rowsState, unselectAll } = useListContext<T>()

  const selectedItems = data.filter(item => {
    const itemState =
      rowsState[(item as Record<string, keyof typeof rowsState>)[idKey]]

    return itemState && itemState.selected
  })

  // Don't display the pop-in if there aren't an item selected
  return selectedItems.length > 0 ? (
    <ActionBar {...props} role="dialog" aria-modal="true">
      <StyledCheckbox
        checked
        onChange={unselectAll}
        autoFocus
        aria-label="unselect-all"
      />
      <StyledItemsCount>{selectedItems.length}</StyledItemsCount>
      <MargedText color="primary" variant="bodyStrong" as="p">
        {typeof text === 'function' ? text(selectedItems.length) : text}
      </MargedText>
      <StyledContainer>
        {typeof children === 'function'
          ? children({ selectedItems, unselectAll })
          : children}
      </StyledContainer>
    </ActionBar>
  ) : null
}

export default SelectBar
