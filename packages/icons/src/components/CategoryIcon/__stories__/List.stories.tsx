import type { Story } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { CategoryIcon } from '..'
import { CATEGORY_ICONS } from '../Icons'

export const List: Story = props => (
  <Stack gap={1}>
    {Object.keys(CATEGORY_ICONS).map(iconName => (
      <Stack direction="row" gap={1} alignItems="center">
        <CategoryIcon
          name={iconName as keyof typeof CATEGORY_ICONS}
          {...props}
        />
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
      </Stack>
    ))}
  </Stack>
)
