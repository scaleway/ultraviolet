import type { StoryFn } from '@storybook/react'
import { DIALOG_SENTIMENTS, Dialog } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Sentiments: StoryFn<typeof Dialog> = () => (
  <Stack direction="row" gap={1}>
    {DIALOG_SENTIMENTS.map(sentiment => (
      <Dialog
        key={sentiment}
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
                <Button sentiment={sentiment} onClick={close}>
                  Confirm
                </Button>
              }
            />
          </Dialog.Stack>
        )}
      </Dialog>
    ))}
  </Stack>
)
