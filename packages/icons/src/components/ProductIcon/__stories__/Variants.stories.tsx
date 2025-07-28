import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import { ConsoleProductIcon } from '../__generated__'

export const Variants: StoryFn<typeof ConsoleProductIcon> = props => (
  <Stack gap={1}>
    {(['primary', 'original', 'danger', 'warning'] as const).map(variant => (
      <Stack alignItems="center" direction="row" gap={1}>
        <ConsoleProductIcon {...props} size="large" variant={variant} />
        <Text as="span" variant="bodyStrong">
          {variant}
        </Text>
      </Stack>
    ))}
  </Stack>
)
