import { theme } from '@ultraviolet/themes'
import type { RefObject } from 'react'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { ColumnProvider } from './ColumnProvider'
import { useListContext } from './ListContext'
import { listStyle } from './styles.css'

export const SelectRowCell = ({
  selectDisabled,
  id,
  isSelectDisabled,
  checkboxRef,
}: {
  selectDisabled?: string | boolean
  id: string
  isSelectDisabled: boolean
  checkboxRef: RefObject<HTMLInputElement | null>
}) => {
  const { selectable, selectedRowIds, inRange, handleOnChange } =
    useListContext()

  return selectable ? (
    <ColumnProvider width={theme.sizing[300]}>
      <Cell className={listStyle.noPaddingCell}>
        <div className={listStyle.checkboxContainer}>
          <Tooltip
            text={
              typeof selectDisabled === 'string' ? selectDisabled : undefined
            }
          >
            <Checkbox
              aria-label="select"
              checked={selectedRowIds[id]}
              className={inRange?.includes(id) ? listStyle.checkboxInRange : ''}
              disabled={isSelectDisabled}
              name="list-select-checkbox"
              onChange={() => handleOnChange(id, selectedRowIds[id])}
              ref={checkboxRef}
              value={id}
            />
          </Tooltip>
        </div>
      </Cell>
    </ColumnProvider>
  ) : null
}
