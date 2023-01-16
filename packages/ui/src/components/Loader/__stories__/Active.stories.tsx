import type { Story } from '@storybook/react'
import { Loader } from '../index'

export const Active: Story = () => <Loader active />

Active.parameters = {
  docs: {
    storyDescription:
      'You can set the `active` prop to indicate to set the indicator active.',
  },
}
