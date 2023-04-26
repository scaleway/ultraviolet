import type { ComponentStory } from '@storybook/react'
import { ButtonV2, buttonSizes } from '..'
import { Stack } from '../..'

export const Size: ComponentStory<typeof ButtonV2> = () => (
  <Stack alignItems="center" gap={2} direction="row">
    {buttonSizes.map(size => (
      <ButtonV2 key={size} icon="pencil" onClick={() => {}} size={size}>
        {size}
      </ButtonV2>
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    storyDescription: 'You can change the button size using the prop `size`.',
  },
}
