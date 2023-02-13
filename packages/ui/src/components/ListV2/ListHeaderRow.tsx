import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Checkbox } from '../Checkbox'
import { useListContext } from './ListContext'
import { ListHeaderCell } from './ListHeaderCell'

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
  column-gap: ${({ theme }) => theme.space['2']};
  padding: 0 ${({ theme }) => theme.space['2']};
`

type ListHeaderRowProps = {
  children: ReactNode
  className?: string
  hasExpandableCell: boolean
}

export const ListHeaderRow = ({
  children,
  className,
  hasExpandableCell,
}: ListHeaderRowProps) => {
  const { template, setSelectedIds, selectedIds, selectableIds } =
    useListContext()

  const checkedValue = useMemo<boolean | 'indeterminate'>(() => {
    if (!selectedIds || Object.keys(selectableIds).length === 0) {
      return false
    }

    if (selectedIds.length === Object.keys(selectableIds).length) {
      return true
    }

    return selectedIds.length === 0 ? false : 'indeterminate'
  }, [selectedIds, selectableIds])

  return (
    <StyledRow role="row" template={template} className={className}>
      {setSelectedIds !== undefined ? (
        <ListHeaderCell>
          <StyledCheckbox
            name="list-radio"
            value="all"
            checked={checkedValue}
            onChange={event => {
              if (event.target.checked && checkedValue !== 'indeterminate') {
                setSelectedIds(Object.keys(selectableIds))
              } else {
                setSelectedIds([])
              }
            }}
            aria-label="select"
            disabled={Object.keys(selectableIds).length === 0}
          />
        </ListHeaderCell>
      ) : null}
      {hasExpandableCell ? <ListHeaderCell /> : null}
      {children}
    </StyledRow>
  )
}
