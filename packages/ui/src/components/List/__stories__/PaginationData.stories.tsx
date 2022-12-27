import { useState } from 'react'
import List from '..'
import type { MockData } from '../../../mocks/list'
import { generateData } from '../../../mocks/list'
import { defaultColumns } from './helper'

export const PaginationData = () => {
  const [data, setData] = useState(generateData(5))

  const loadNewPage = ({ page }: { page: number }) =>
    new Promise<MockData[]>(resolve => {
      setTimeout(() => {
        const newData = generateData(5, `page-${page}`)
        setData(newData)
        resolve(newData)
      }, 1500)
    })

  return (
    <List<MockData>
      multiselect
      pageCount={2}
      idKey="id"
      data={data}
      onLoadPage={loadNewPage}
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
  )
}
