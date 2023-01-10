import styled from '@emotion/styled'
import type { ChangeEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import { Checkbox } from '../Checkbox'
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
    setSelectedIds,
    selectedIds,
    selectableIds,
    showExpandArrow,
  } = useListContext()

  const checkedValue = useMemo<boolean | 'indeterminate'>(() => {
    if (!selectedIds) {
      return true
    }

    if (selectedIds.length === Object.keys(selectableIds).length) {
      return true
    }

    return selectedIds.length === 0 ? false : 'indeterminate'
  }, [selectedIds, selectableIds])

  const handleCheck: ChangeEventHandler<HTMLInputElement> = event => {
    if (!setSelectedIds) {
      return false
    }

    if (event.target.checked && checkedValue !== 'indeterminate') {
      setSelectedIds(Object.keys(selectableIds))
    } else {
      setSelectedIds([])
    }

    return true
  }

  return (
    <StyledRow
      role="row"
      template={showExpandArrow ? `${template} 25px` : template}
      className={className}
    >
      {setSelectedIds ? (
        <ListHeader>
          {checkboxRender ?? (
            <StyledCheckbox
              name="list-radio"
              value="all"
              checked={checkedValue}
              onChange={handleCheck}
              aria-label="select"
            />
          )}
        </ListHeader>
      ) : null}
      {children}
    </StyledRow>
  )
}
