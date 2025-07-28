import type { StoryFn } from '@storybook/react-vite'
import { Checkbox } from '..'

export const EmptyText: StoryFn<typeof Checkbox> = ({
  onChange = console.log,
}) => <Checkbox aria-label="empty-text" onChange={onChange} />
