import type { Theme } from '@emotion/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useTableContext } from './TableContext'

const StyledCheckboxContainer = styled.div`
  display: flex;
`

// We start at 5% and finish at 80% to leave the original background color
// as we can't know if the table will be stripped or not
const colorChange = (theme: Theme) => keyframes`
  5% {
    background-color: ${theme.colors.primary.background};
  }
  80% {
    background-color: ${theme.colors.primary.background};
  }
`

const StyledTr = styled('tr', {
  shouldForwardProp: prop => !['highlightAnimation'].includes(prop),
})<{ highlightAnimation?: boolean }>`
  animation: ${({ highlightAnimation, theme }) =>
      highlightAnimation ? colorChange(theme) : undefined}
    3s linear;
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
  highlightAnimation?: boolean
}

export const Row = ({
  children,
  className,
  id,
  selectDisabled,
  highlightAnimation,
  'data-testid': dataTestid,
}: RowProps) => {
  const {
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
    <StyledTr
      className={className}
      data-testid={dataTestid}
      highlightAnimation={highlightAnimation}
    >
      {selectable ? (
        <Cell>
          <StyledCheckboxContainer>
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
    </StyledTr>
  )
}
