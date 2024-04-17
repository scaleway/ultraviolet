import type { StoryFn } from '@storybook/react'
import { Dialog } from '..'
import { Button } from '../../Button'

export const Template: StoryFn<typeof Dialog> = props => (
  <Dialog {...props}>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
      consectetur est. Donec lorem orci, feugiat vitae lacinia bibendum,
      malesuada vitae elit.
    </div>
  </Dialog>
)

Template.args = {
  disclosure: <Button>Open Dialog</Button>,
  sentiment: 'primary',
  title: 'Hello',
}
