import type { Story } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { ProductIcon } from '..'

export const Sizes: Story = props => (
  <Stack gap={1}>
    {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
      <Stack direction="row" gap={1} alignItems="center">
        <ProductIcon name="console" size={size} {...props} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
