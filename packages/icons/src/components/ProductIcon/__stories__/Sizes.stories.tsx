import { Stack, Text } from '@ultraviolet/ui'

import { ConsoleProductIcon } from '../__generated__'
import { SIZES } from '../constants'

import type { StoryFn } from '@storybook/react-vite'

export const Sizes: StoryFn<typeof ConsoleProductIcon> = props => (
  <Stack gap={1}>
    {Object.keys(SIZES).map(size => (
      <Stack alignItems="center" direction="row" gap={1} key={size}>
        <ConsoleProductIcon {...props} size={size as keyof typeof SIZES} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
