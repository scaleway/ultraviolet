import type { StoryFn } from '@storybook/react'
import { Button } from '..'
import { Stack } from '../..'

export const IconPosition: StoryFn<typeof Button> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    <Button icon="pencil" onClick={() => {}} iconPosition="left">
      Left
    </Button>
    <Button icon="pencil" onClick={() => {}} iconPosition="right">
      Right
    </Button>
  </Stack>
)

IconPosition.parameters = {
  docs: {
    storyDescription:
      'You can change the icon/loader using the prop `iconPosition`.',
  },
}
