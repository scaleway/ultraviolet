import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from '..'
import { Stack } from '../../../layout/Stack'

export const HideButtons: StoryFn = props => {
  const [page, setPage] = useState(5)

  return (
    <Stack gap={1}>
      Hide first page:
      <Pagination pageCount={20} {...props} onChange={setPage} page={page} hideFirstPage />
      Hide last page:
      <Pagination pageCount={20} {...props} onChange={setPage} page={page} hideLastPage />
      Hide both:
      <Pagination pageCount={20} {...props} onChange={setPage} page={page} hideFirstPage hideLastPage />
    </Stack>
  )
}

HideButtons.args = {
  pageTabCount: 5,
}

HideButtons.parameters = {
  docs: {
    description: {
      story: 'Using props `hideFirstPage` and `hideLastPage` it is possible to hide the first and last button.',
    },
  },
}

HideButtons.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
