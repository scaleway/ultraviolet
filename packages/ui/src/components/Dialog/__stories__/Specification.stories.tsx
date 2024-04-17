import type { StoryFn } from '@storybook/react'
import { Dialog } from '..'
import { Button } from '../../Button'
import { Text } from '../../Text'

export const Specifications: StoryFn<typeof Dialog> = () => (
  <Dialog
    title="Discard changes?"
    sentiment="danger"
    disclosure={<Button>Open Dialog</Button>}
  >
    {({ close }) => (
      <Dialog.Stack>
        <Dialog.Text>
          Are you sure you want to leave this page without saving your changes
          to the policy? Any unsaved modifications will be lost
        </Dialog.Text>
        <Text as="p" variant="body">
          blabla
        </Text>
        <Dialog.Buttons
          secondaryButton={
            <Dialog.CancelButton onClick={close}>Cancel</Dialog.CancelButton>
          }
          primaryButton={
            <Button sentiment="danger" onClick={close}>
              Discard changes
            </Button>
          }
        />
        <Dialog.Buttons>
          <Dialog.CancelButton>Cancel</Dialog.CancelButton>
          <Dialog.Button>Discard changes</Dialog.Button>
        </Dialog.Buttons>
      </Dialog.Stack>
    )}
  </Dialog>
)

Specifications.parameters = {
  docs: {
    description: {
      story:
        'The `Dialog` content is up to you, but still the component offers mulitples sub-components which can help to easily use current component guidelines and also help to to maintain it in time.',
    },
  },
}
