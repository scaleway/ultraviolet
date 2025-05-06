import type { StoryFn } from '@storybook/react'
import { PencilIcon } from '@ultraviolet/icons'
import { Button, buttonSizes } from '..'
import { Stack } from '../..'

export const Size: StoryFn<typeof Button> = args => (
  <Stack alignItems="center" gap={2} direction="row">
    {buttonSizes.map(size => (
      <Button {...args} key={size} onClick={() => {}} size={size}>
        <PencilIcon />
        {size}
      </Button>
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: {
      story: 'You can change the button size using the prop `size`.',
    },
  },
}
