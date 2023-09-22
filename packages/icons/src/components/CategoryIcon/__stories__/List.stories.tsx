import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { CategoryIcon } from '..'
import { CATEGORY_ICONS } from '../Icons'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CATEGORY_ICONS).map(iconName => (
      <Stack direction="row" gap={1} alignItems="center">
        <CategoryIcon
          {...props}
          name={iconName as keyof typeof CATEGORY_ICONS}
        />
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
      </Stack>
    ))}
  </Stack>
)
