import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn = props => {
  const [page, setPage] = useState(5)

  return (
    <Stack gap={1}>
      Small:
      <Pagination {...props} onChange={setPage} page={page} pageCount={20} size="small" />
      Medium (default value):
      <Pagination {...props} onChange={setPage} page={page} pageCount={20} size="medium" />
    </Stack>
  )
}

Size.args = {
  pageTabCount: 5,
}

Size.parameters = {
  docs: {
    description: {
      story:
        'It is possible to have smaller buttons by setting the prop `size` to "small". When `perPage` is defined, the button will automatically be small, regardless of `size` prop value.',
    },
  },
}

Size.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
