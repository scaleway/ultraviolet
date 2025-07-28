import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Dialog } from '..'

export const Specifications: StoryFn<typeof Dialog> = props => (
  <Dialog
    {...props}
    disclosure={<Button>Open Dialog</Button>}
    sentiment="danger"
    title="Discard changes?"
  >
    {({ close }) => (
      <Dialog.Stack>
        <Dialog.Text>
          Are you sure you want to leave this page without saving your changes
          to the policy? Any unsaved modifications will be lost
        </Dialog.Text>
        <Dialog.Buttons
          primaryButton={
            <Dialog.Button onClick={close}>Discard changes</Dialog.Button>
          }
          secondaryButton={
            <Dialog.CancelButton onClick={close}>Cancel</Dialog.CancelButton>
          }
        />
      </Dialog.Stack>
    )}
  </Dialog>
)

Specifications.parameters = {
  docs: {
    description: {
      story:
        'The `Dialog` content is up to you, but still the component offers multiples sub-components which can help to easily use current component guidelines and also help to maintain it in time.',
    },
  },
}
