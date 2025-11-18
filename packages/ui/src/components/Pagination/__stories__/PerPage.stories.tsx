import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Pagination } from '..'
import { list } from './styles.css'

const NUMBER_OF_ITEMS = 134

export const PerPage: StoryFn = props => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const computeNumberOfPages = Math.ceil(NUMBER_OF_ITEMS / perPage)

  return (
    <Stack gap={1}>
      <ul className={list}>
        {Array.from({ length: perPage }).map((_, index) => {
          const itemNumber = perPage * (page - 1) + index + 1
          if (itemNumber <= NUMBER_OF_ITEMS) {
            return <li key={itemNumber}>Item #{itemNumber}</li>
          }

          return null
        })}
      </ul>
      <Pagination
        {...props}
        numberOfItems={NUMBER_OF_ITEMS}
        onChange={setPage}
        onChangePerPage={setPerPage}
        page={page}
        pageCount={computeNumberOfPages}
        perPage={perPage}
      />
    </Stack>
  )
}

PerPage.args = {
  label: 'Label',
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  numberOfItemsText: `of ${NUMBER_OF_ITEMS} items`,
  value: 40,
}

PerPage.parameters = {
  docs: {
    description: {
      story: 'Define number of elements to show per page',
    },
  },
}

PerPage.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
