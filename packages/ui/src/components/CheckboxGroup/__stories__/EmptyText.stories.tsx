import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const EmptyText: StoryFn<typeof Checkbox> = ({
  onChange = console.log,
}) => <Checkbox onChange={onChange} aria-label="empty-text" />
