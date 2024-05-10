import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { ProductIcon } from '..'
import { PRODUCT_ICONS } from '../Icons'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(PRODUCT_ICONS).map(iconName => (
      <Stack direction="row" gap={1} alignItems="center">
        <ProductIcon
          name={iconName as keyof typeof PRODUCT_ICONS}
          size="large"
          {...props}
        />
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
      </Stack>
    ))}
  </Stack>
)
