import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { ConsoleProductIcon } from '..'

export const Variants: StoryFn<typeof ConsoleProductIcon> = props => (
  <Stack gap={1}>
    {(['primary', 'original', 'danger', 'warning'] as const).map(variant => (
      <Stack direction="row" gap={1} alignItems="center">
        <ConsoleProductIcon {...props} variant={variant} size="large" />
        <Text as="span" variant="bodyStrong">
          {variant}
        </Text>
      </Stack>
    ))}
  </Stack>
)
