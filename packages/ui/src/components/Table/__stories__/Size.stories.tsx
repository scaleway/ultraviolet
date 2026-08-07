import type { StoryFn } from '@storybook/react-vite'
import { Table } from '..'
import { Stack } from '../../Stack'
import { Template } from './Template.stories'

export const Size: StoryFn<typeof Table> = ({ ...props }) => (
  <Stack gap={2}>
    Small: <Table {...props} size="small" /> Medium (default size): <Table {...props} />
    Large: <Table {...props} size="large" />
  </Stack>
)

Size.args = { ...Template.args }

Size.parameters = {
  docs: {
    description: {
      story:
        'You can change Table size. For a smaller, more compact Table, set prop `size` to `small`. You can also opt for a larger table with `size` `large`',
    },
  },
}
