import type { StoryFn } from '@storybook/react'
import { Row, Stack, Text } from '@ultraviolet/ui'
import { CategoryIcon } from '..'
import { CATEGORY_ICONS } from '../Icons'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CATEGORY_ICONS).map(iconName => (
      <Stack direction="row" alignItems="center" gap={2}>
        <Text as="span" variant="bodyStrong">
          {iconName}
        </Text>
        <Row templateColumns="repeat(3, 3fr)" gap={1} alignItems="center">
          <CategoryIcon
            {...props}
            name={iconName as keyof typeof CATEGORY_ICONS}
          />
          <CategoryIcon
            {...props}
            name={iconName as keyof typeof CATEGORY_ICONS}
            variant="neutral"
          />
          <CategoryIcon
            {...props}
            name={iconName as keyof typeof CATEGORY_ICONS}
            disabled
          />
        </Row>
      </Stack>
    ))}
  </Stack>
)
