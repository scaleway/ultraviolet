import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { ActionBar } from '../ActionBar'
import { useListContext } from './ListContext'

const StyledActionBar = styled(ActionBar)`
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space['1']};
`

const FlexDiv = styled.div`
  flex: 1;
`

type SelectBarProps<T> = {
  className?: string
  children: (p: { selectedItems: T[]; unselectAll: () => void }) => ReactNode
  data: T[]
  /**
   * The idKey of each data entry
   * */
  idKey: keyof T
}

export function SelectBar<T>({
  children,
  data,
  idKey,
  className,
}: SelectBarProps<T>) {
  const { selectedRowIds, unselectAll } = useListContext()

  const selectedItems = useMemo(
    () => data.filter(item => selectedRowIds[item[idKey] as string]),
    [data, idKey, selectedRowIds],
  )

  if (selectedItems.length === 0) {
    return null
  }

  return (
    <StyledActionBar className={className} >
      <FlexDiv>
        {children({
          selectedItems,
          unselectAll,
        })}
      </FlexDiv>
    </StyledActionBar>
  )
}
