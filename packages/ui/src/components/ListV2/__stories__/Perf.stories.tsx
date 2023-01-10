import type { Story } from '@storybook/react'
import { useMemo, useState } from 'react'
import { List } from '..'
import { Button, PaginationV2, Stack } from '../..'

const ITEM_PER_PAGE = 50

export const Perf: Story = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const [data, setData] = useState(() =>
    Array.from({ length: 1234 }).map((_, dataIndex) => ({
      id: `id-${dataIndex}`,
      a: `Row ${dataIndex} Column 1`,
      b: `Row ${dataIndex} Column 2`,
      c: `Row ${dataIndex} Column 3`,
      d: `Row ${dataIndex} Column 4`,
      e: `Row ${dataIndex} Column 5`,
    })),
  )

  const paginatedData = useMemo(() => {
    const startOffset = (page - 1) * ITEM_PER_PAGE
    const endOffset = page * ITEM_PER_PAGE

    return data.slice(startOffset, endOffset)
  }, [data, page])

  return (
    <Stack gap={2}>
      <List
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        columns={[
          { label: 'id' },
          { label: 'b' },
          { label: 'c' },
          { label: 'd' },
          { label: 'e' },
          { label: 'Actions' },
        ]}
      >
        <List.Body>
          {paginatedData.map(rowData => (
            <List.Row key={rowData.id} id={rowData.id} isHoverable>
              <List.Cell>{rowData.id}</List.Cell>
              <List.Cell>{rowData.b}</List.Cell>
              <List.Cell>{rowData.c}</List.Cell>
              <List.Cell>{rowData.d}</List.Cell>
              <List.Cell>{rowData.e}</List.Cell>
              <List.Cell>
                <Button
                  onClick={() => {
                    setData(currentData =>
                      currentData.filter(
                        dataItem => dataItem.id !== rowData.id,
                      ),
                    )
                  }}
                >
                  delete
                </Button>
              </List.Cell>
              <List.Expandable>
                <div>{rowData.a}</div>
              </List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>
      <PaginationV2
        page={page}
        pageCount={Math.ceil(data.length / ITEM_PER_PAGE)}
        onChange={setPage}
      />
    </Stack>
  )
}
