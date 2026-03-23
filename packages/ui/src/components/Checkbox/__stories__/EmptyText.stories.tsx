import { Checkbox } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const EmptyText: StoryFn<typeof Checkbox> = ({
  onChange = console.log,
}) => <Checkbox aria-label="empty-text" onChange={onChange} />
