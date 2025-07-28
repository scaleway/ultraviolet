import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Dialog } from '..'
import { DIALOG_SENTIMENTS } from '../constants'

export const Sentiments: StoryFn<typeof Dialog> = props => (
  <Stack direction="row" gap={1}>
    {DIALOG_SENTIMENTS.map(sentiment => (
      <Dialog
        key={sentiment}
        {...props}
        disclosure={
          <Button sentiment={sentiment}>Open Dialog ({sentiment})</Button>
        }
        sentiment={sentiment}
        title={sentiment}
      >
        {({ close }) => (
          <Dialog.Stack>
            <Dialog.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
              consectetur est. Donec lorem orci, feugiat vitae lacinia bibendum,
              malesuada vitae elit.
            </Dialog.Text>
            <Dialog.Buttons
              primaryButton={
                <Dialog.Button onClick={close}>Confirm</Dialog.Button>
              }
              secondaryButton={
                <Dialog.CancelButton onClick={close}>
                  Cancel
                </Dialog.CancelButton>
              }
            />
          </Dialog.Stack>
        )}
      </Dialog>
    ))}
  </Stack>
)
