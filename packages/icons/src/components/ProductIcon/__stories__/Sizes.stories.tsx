import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { ProductIcon } from '..'

export const Sizes: StoryFn<typeof ProductIcon> = props => (
  <Stack gap={1}>
    {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
      <Stack direction="row" gap={1} alignItems="center">
        <ProductIcon {...props} name="console" size={size} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
