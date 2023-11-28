import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useTableContext } from './TableContext'

const StyledCheckboxContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.neutral.background};
`

type RowProps = {
  children: ReactNode
  className?: string
  id: string
  'data-testid'?: string
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   * */
  selectDisabled?: boolean | string
}

export const Row = ({
  children,
  className,
  id,
  selectDisabled,
  'data-testid': dataTestid,
}: RowProps) => {
  const {
    allRowSelectValue,
    selectable,
    registerSelectableRow,
    selectedRowIds,
    selectRow,
    unselectRow,
  } = useTableContext()

  useEffect(() => {
    if (!selectDisabled) {
      const unregisterCallback = registerSelectableRow(id)

      return unregisterCallback
    }

    return undefined
  }, [id, registerSelectableRow, selectDisabled])

  return (
    <tr className={className} data-ultraviolet data-testid={dataTestid}>
      {selectable ? (
        <Cell>
          <StyledCheckboxContainer
            data-visibility={allRowSelectValue === false ? 'hover' : undefined}
          >
            <Tooltip
              text={
                typeof selectDisabled === 'string' ? selectDisabled : undefined
              }
            >
              <Checkbox
                name="table-select-checkbox"
                aria-label="select"
                checked={selectedRowIds[id]}
                value={id}
                onChange={() => {
                  if (selectedRowIds[id]) {
                    unselectRow(id)
                  } else {
                    selectRow(id)
                  }
                }}
                disabled={selectDisabled !== undefined}
              />
            </Tooltip>
          </StyledCheckboxContainer>
        </Cell>
      ) : null}
      {children}
    </tr>
  )
}
