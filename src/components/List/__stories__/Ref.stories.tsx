import { useRef } from 'react'
import type { ListRefType } from '..'
import List from '..'
import type { MockData } from '../../../mocks/list'
import { generateData } from '../../../mocks/list'
import Button from '../../Button'
import Stack from '../../Stack'
import { defaultColumns } from './helper'

export const Ref = () => {
  const ref = useRef<ListRefType<MockData>>(null)
  const handleClick = () => {
    ref.current?.unselectAll()
  }

  return (
    <Stack gap={2}>
      <Button onClick={handleClick}>Reset selected</Button>
      <List
        multiselect
        ref={ref}
        idKey="id"
        data={generateData(5)}
        columns={defaultColumns}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>
    </Stack>
  )
}

Ref.parameters = {
  docs: {
    storyDescription: `By passing a \`ref\` prop it will be hydrated with:

- hasSelectedItems : Return true if at least one row is selected
- selectAll() : Select all rows
- selectableItems : List of all rows that can be selected
- selectedItems : Return selected items
- unselectAll() : Unselect all rows
- hasAllSelected: True if all rows are selected`,
  },
}
