import type { StoryFn } from '@storybook/react-vite'
import { Dialog } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { DIALOG_SENTIMENTS } from '../constants'

export const Sentiments: StoryFn<typeof Dialog> = props => (
  <Stack direction="row" gap={1}>
    {DIALOG_SENTIMENTS.map(sentiment => (
      <Dialog
        key={sentiment}
        {...props}
        title={sentiment}
        sentiment={sentiment}
        disclosure={
          <Button sentiment={sentiment}>Open Dialog ({sentiment})</Button>
        }
      >
        {({ close }) => (
          <Dialog.Stack>
            <Dialog.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
              consectetur est. Donec lorem orci, feugiat vitae lacinia bibendum,
              malesuada vitae elit.
            </Dialog.Text>
            <Dialog.Buttons
              secondaryButton={
                <Dialog.CancelButton onClick={close}>
                  Cancel
                </Dialog.CancelButton>
              }
              primaryButton={
                <Dialog.Button onClick={close}>Confirm</Dialog.Button>
              }
            />
          </Dialog.Stack>
        )}
      </Dialog>
    ))}
  </Stack>
)
