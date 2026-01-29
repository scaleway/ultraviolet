import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { Stack } from '../..'
import { Button } from '..'
import { SIZE_KEY } from '../constants'

export const Size: StoryFn<typeof Button> = args => (
  <Stack alignItems="center" direction="row" gap={2}>
    {SIZE_KEY.map(size => (
      <Button key={size} {...args} onClick={() => {}} size={size}>
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
