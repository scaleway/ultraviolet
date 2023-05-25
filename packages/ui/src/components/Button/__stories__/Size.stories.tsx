import type { ComponentStory } from '@storybook/react'
import { Button, buttonSizes } from '..'
import { Stack } from '../..'

export const Size: ComponentStory<typeof Button> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    {buttonSizes.map(size => (
      <Button key={size} icon="pencil" onClick={() => {}} size={size}>
        {size}
      </Button>
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    storyDescription: 'You can change the button size using the prop `size`.',
  },
}
