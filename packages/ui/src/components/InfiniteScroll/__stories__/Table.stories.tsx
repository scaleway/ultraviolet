import type { StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { Skeleton } from '../../Skeleton'
import { Table as UVTable } from '../../Table'
import { InfiniteScroll } from '..'
import { generateRandomNamesArray, TABLE_COLUMNS, TABLE_DATA } from './data'

const ListLoader = () => (
  <>
    {[1, 2, 3, 4].map(value => (
      <UVTable.Row id={`loader-${value}`} key={value}>
        <UVTable.Cell>
          <Skeleton length={100} variant="line" />
        </UVTable.Cell>
        <UVTable.Cell>
          <Skeleton variant="line" />
        </UVTable.Cell>
        <UVTable.Cell>
          <Skeleton variant="line" />
        </UVTable.Cell>
        <UVTable.Cell>
          <Skeleton variant="line" />
        </UVTable.Cell>
      </UVTable.Row>
    ))}
  </>
)

export const Table: StoryFn<typeof InfiniteScroll> = args => {
  const [data, setData] = useState(TABLE_DATA)
  const containerRef = useRef(null)

  const loadMoreData = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        const newData = generateRandomNamesArray(5, 10).map(name => ({
          director: 'George Lucas',
          id: Math.random().toString(),
          name,
          releaseYear: 2000,
          storyBy: 'George Lucas',
          trilogy: 'Unknown',
        }))

        setData(prevData => [...prevData, ...newData])
        resolve('ok')
      }, 2000)
    })
    console.log('Data loaded')
  }

  return (
    <div ref={containerRef} style={{ height: '250px', overflowY: 'scroll' }}>
      <UVTable columns={TABLE_COLUMNS}>
        <UVTable.Body>
          {data.map(movie => (
            <UVTable.Row id={movie.id} key={movie.id}>
              <UVTable.Cell>{movie.name}</UVTable.Cell>
              <UVTable.Cell>{movie.releaseYear}</UVTable.Cell>
              <UVTable.Cell>{movie.trilogy}</UVTable.Cell>
              <UVTable.Cell>{movie.director}</UVTable.Cell>
            </UVTable.Row>
          ))}
          <InfiniteScroll
            {...args}
            as="tr"
            height={144}
            loader={<ListLoader />}
            onLoadMore={loadMoreData}
            scrollParentRef={containerRef}
          />
        </UVTable.Body>
      </UVTable>
    </div>
  )
}

Table.parameters = {
  docs: {
    description: {
      story:
        'Another example here with the Table component. This time we need to use prop `as` to set the InfiniteScroll as a `tr` element and avoid HTML validation errors.',
    },
  },
}
