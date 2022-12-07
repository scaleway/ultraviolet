import { ComponentStory } from '@storybook/react'
import Checkbox from '..'

export const EmptyText: ComponentStory<typeof Checkbox> = ({
  onChange = console.log,
  ...props
}) => <Checkbox onChange={onChange} aria-label="empty-text" {...props} />
