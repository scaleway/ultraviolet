import type { StoryFn } from '@storybook/react'
import { Row, Snippet, Stack } from '@ultraviolet/ui'
import * as CategoryIcon from '..'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CategoryIcon).map(IconName => {
      const FoundCategoryIcon =
        CategoryIcon[IconName as keyof typeof CategoryIcon]

      return (
        <Stack key={IconName} direction="row" alignItems="center" gap={2}>
          <Row templateColumns="repeat(3, 3fr)" gap={1} alignItems="center">
            <FoundCategoryIcon />
            <FoundCategoryIcon {...props} variant="neutral" />
            <FoundCategoryIcon {...props} disabled />
          </Row>
          <Snippet>{`import { ${IconName} } from '@ultraviolet/icons/category'`}</Snippet>
        </Stack>
      )
    })}
  </Stack>
)
