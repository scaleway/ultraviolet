import type { StoryFn } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { InfiniteScroll } from '..'
import { Skeleton } from '../../Skeleton'
import { Table as UVTable } from '../../Table'
import { TABLE_COLUMNS, TABLE_DATA, generateRandomNamesArray } from './data'

const ListLoader = () => (
  <>
    {[1, 2, 3, 4].map(value => (
      <UVTable.Row key={value} id={`loader-${value}`}>
        <UVTable.Cell>
          <Skeleton variant="line" length={100} />
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
          name,
          releaseYear: 2000,
          trilogy: 'Unknown',
          director: 'George Lucas',
          storyBy: 'George Lucas',
          id: Math.random().toString(),
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
            <UVTable.Row key={movie.id} id={movie.id}>
              <UVTable.Cell>{movie.name}</UVTable.Cell>
              <UVTable.Cell>{movie.releaseYear}</UVTable.Cell>
              <UVTable.Cell>{movie.trilogy}</UVTable.Cell>
              <UVTable.Cell>{movie.director}</UVTable.Cell>
            </UVTable.Row>
          ))}
          <InfiniteScroll
            {...args}
            as="tr"
            scrollParentRef={containerRef}
            loader={<ListLoader />}
            height={144}
            onLoadMore={loadMoreData}
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
