import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ultraviolet/icons/ArrowUpIcon'
import { theme } from '@ultraviolet/themes'

import { Button } from '../Button'

import { Cell } from './Cell'
import { ColumnProvider } from './ColumnProvider'
import { useListContext } from './ListContext'
import { listStyle } from './styles.css'

import type { SENTIMENTS } from '../../theme'
import type { ReactNode } from 'react'

export const ExpandButtonCell = ({
  disabled,
  expandable,
  toggleRowExpand,
  sentiment,
  id,
}: {
  disabled?: boolean
  expandable?: ReactNode
  toggleRowExpand: () => void
  sentiment: (typeof SENTIMENTS)[number]
  id: string
}) => {
  const { expandedRowIds, expandButton } = useListContext()

  return expandButton ? (
    <ColumnProvider width={theme.sizing[400]}>
      <Cell className={listStyle.noPaddingCell}>
        <Button
          aria-label="expand"
          className={listStyle.expandableButton}
          data-testid="list-expand-button"
          disabled={disabled || !expandable}
          onClick={() => toggleRowExpand()}
          sentiment={sentiment}
          size="small"
          variant="ghost"
        >
          {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Button>
      </Cell>
    </ColumnProvider>
  ) : null
}
