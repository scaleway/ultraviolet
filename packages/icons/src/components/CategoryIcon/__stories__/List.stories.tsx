import type { StoryFn } from '@storybook/react'
import { Row, Stack, Text } from '@ultraviolet/ui'
import * as CategoryIcon from '..'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CategoryIcon).map(IconName => {
      const FoundCategoryIcon =
        CategoryIcon[IconName as keyof typeof CategoryIcon]

      return (
        <Stack direction="row" alignItems="center" gap={2}>
          <Text as="span" variant="bodyStrong">
            {IconName}
          </Text>
          <Row templateColumns="repeat(3, 3fr)" gap={1} alignItems="center">
            <FoundCategoryIcon />
            <FoundCategoryIcon {...props} variant="neutral" />
            <FoundCategoryIcon {...props} disabled />
          </Row>
        </Stack>
      )
    })}
  </Stack>
)
