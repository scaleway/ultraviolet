import type { StoryFn } from '@storybook/react-vite'
import { Dialog } from '..'
import { Button } from '../../Button'

export const Template: StoryFn<typeof Dialog> = props => (
  <Dialog {...props}>
    {({ close }) => (
      <Dialog.Stack>
        <Dialog.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
          consectetur est. Donec lorem orci, feugiat vitae lacinia bibendum,
          malesuada vitae elit.
        </Dialog.Text>
        <Dialog.Buttons
          secondaryButton={
            <Dialog.CancelButton onClick={close}>Cancel</Dialog.CancelButton>
          }
          primaryButton={<Dialog.Button onClick={close}>Confirm</Dialog.Button>}
        />
      </Dialog.Stack>
    )}
  </Dialog>
)

Template.args = {
  disclosure: <Button>Open Dialog</Button>,
  sentiment: 'primary',
  title: 'Hello',
}
