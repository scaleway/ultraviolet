import type { StoryFn } from '@storybook/react'
import { Button } from '..'
import { Stack } from '../..'

export const IconPosition: StoryFn<typeof Button> = args => (
  <Stack alignItems="center" gap={2} direction="row">
    <Button icon="pencil" onClick={() => {}} iconPosition="left" {...args}>
      Left
    </Button>
    <Button icon="pencil" onClick={() => {}} iconPosition="right" {...args}>
      Right
    </Button>
  </Stack>
)

IconPosition.parameters = {
  docs: {
    description: {
      story: 'You can change the icon/loader using the prop `iconPosition`.',
    },
  },
}
