import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { ActionBar } from '../ActionBar'
import { Checkbox } from '../Checkbox'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { useListContext } from './context'

const StyledStack = styled(Stack)`
  height: 100%;
  padding: 0 ${({ theme }) => theme.space['2']};
`

const StyledCheckbox = styled(Checkbox)`
  justify-content: center;
  display: flex;
  margin-right: ${({ theme }) => theme.space['2']};
`

const StyledItemsCount = styled.div`
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.default};
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

const DEFAULT_TEXT: ListSelectBarProps<
  Record<string, unknown>
>['text'] = count => (count === 1 ? 'item selected' : `items selected`)

function SelectBar<T extends Record<string, unknown>>({
  children,
  text = DEFAULT_TEXT,
  ...props
}: ListSelectBarProps<T>) {
  const { data, idKey, rowsState, unselectAll } = useListContext<T>()

  const selectedItems = data.filter(item => {
    const itemState =
      rowsState[(item as Record<string, keyof typeof rowsState>)[idKey]]

    return itemState?.selected
  })

  // Don't display the pop-in if there aren't an item selected
  return selectedItems.length > 0 ? (
    <ActionBar {...props} >
      <StyledStack alignItems="center" direction="row">
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
      </StyledStack>
    </ActionBar>
  ) : null
}

export default SelectBar
