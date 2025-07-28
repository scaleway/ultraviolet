import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import { ConsoleProductIcon } from '../__generated__'
import { SIZES } from '../Icon'

export const Sizes: StoryFn<typeof ConsoleProductIcon> = props => (
  <Stack gap={1}>
    {Object.keys(SIZES).map(size => (
      <Stack direction="row" gap={1} alignItems="center">
        <ConsoleProductIcon {...props} size={size as keyof typeof SIZES} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
