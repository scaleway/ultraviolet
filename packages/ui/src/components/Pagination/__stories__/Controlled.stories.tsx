import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from '..'
import { Badge } from '../../Badge'

export const Controlled: StoryFn = props => {
  const [page, setPage] = useState(1)

  return (
    <>
      Current page : {page}{' '}
      <Pagination {...props} onChange={setPage} page={page} pageCount={10} />
    </>
  )
}

Controlled.args = {
  value: 40,
  labelDescription: (
    <Badge sentiment="primary" size="small">
      New
    </Badge>
  ),
  label: 'Label',
}

Controlled.parameters = {
  docs: {
    description: {
      story: 'Define number of elements to show per page',
    },
  },
}
