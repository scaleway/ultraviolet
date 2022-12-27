import { useState } from 'react'
import List from '..'
import { generateData } from '../../../mocks/list'
import { defaultColumns } from './helper'

export const PaginationLazyLoading = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [paginatedData, setPaginatedData] = useState({
    data: generateData(5, '1'),
    total: 100,
  })

  const [isLoading, setIsLoading] = useState(false)

  const fetchMoreData = (newPage: number) => {
    setIsLoading(true)
    setCurrentPage(newPage)
    setTimeout(() => {
      setPaginatedData({
        ...paginatedData,
        data: generateData(5, newPage.toString()),
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <List
      isLoading={isLoading}
      data={paginatedData.data}
      page={currentPage}
      pageCount={paginatedData.total / 5}
      onChangePage={fetchMoreData}
      multiselect
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
