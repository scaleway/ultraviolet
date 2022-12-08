import styled from '@emotion/styled'
import { ChangeEventHandler, ReactNode, useCallback, useMemo } from 'react'
import Checkbox from '../Checkbox'
import { useListContext } from './ListContext'
import { ListHeader } from './ListHeader'

const StyledCheckbox = styled(Checkbox)`
  display: flex;
`

const StyledRow = styled('div', {
  shouldForwardProp: prop => prop !== 'template',
})<{
  template: string
}>`
  display: grid;
  grid-template-columns: ${({ template }) => template};
  column-gap: ${({ theme }) => theme.space['1']};

  & > [role='columnheader']:first-of-type {
    padding-left: ${({ theme }) => theme.space['1']};
  }

  & > [role='columnheader']:last-of-type {
    padding-right: ${({ theme }) => theme.space['1']};
  }
`

type ListHeaderRowProps = {
  children: ReactNode
  className?: string
  checkboxRender?: ReactNode
}

export const ListHeaderRow = ({
  children,
  className,
  checkboxRender,
}: ListHeaderRowProps) => {
  const {
    template,
    isSelectable,
    selectedIds,
    setSelectedIds,
    data,
    idKey,
    disabledRowsRef,
  } = useListContext()

  const getSelectableRows = useCallback(
    () =>
      data
        .map<string>(item => `${item[idKey] as string}`)
        .filter(id => id !== '' && !disabledRowsRef.current.includes(id)),
    [data, disabledRowsRef, idKey],
  )

  const checkedValue = useMemo(() => {
    if (selectedIds.length === getSelectableRows().length) {
      return true
    }

    return selectedIds.length > 0 ? 'indeterminate' : false
  }, [getSelectableRows, selectedIds.length])

  const handleCheck: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.target.checked && checkedValue !== 'indeterminate') {
      setSelectedIds(getSelectableRows())
    } else {
      setSelectedIds([])
    }

    return true
  }

  return (
    <StyledRow role="row" template={template} className={className}>
      {isSelectable ? (
        <ListHeader>
          {checkboxRender ?? (
            <StyledCheckbox
              name="list-radio"
              value="all"
              checked={checkedValue}
              onChange={handleCheck}
            />
          )}
        </ListHeader>
      ) : null}
      {children}
    </StyledRow>
  )
}
