import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from '..'
import { Stack } from '../../Stack'

export const HideButtons: StoryFn = props => {
  const [page, setPage] = useState(5)

  return (
    <Stack gap={1}>
      Hide first page:
      <Pagination {...props} onChange={setPage} page={page} pageCount={20} hideFirstPage />
      Hide last page:
      <Pagination {...props} onChange={setPage} page={page} pageCount={20} hideLastPage />
      Hide both:
      <Pagination {...props} onChange={setPage} page={page} pageCount={20} hideFirstPage hideLastPage />
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
