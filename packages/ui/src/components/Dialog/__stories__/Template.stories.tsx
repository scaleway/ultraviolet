import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Dialog } from '..'

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
          primaryButton={<Dialog.Button onClick={close}>Confirm</Dialog.Button>}
          secondaryButton={
            <Dialog.CancelButton onClick={close}>Cancel</Dialog.CancelButton>
          }
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
