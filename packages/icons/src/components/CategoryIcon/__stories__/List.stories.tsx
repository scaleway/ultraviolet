import type { StoryFn } from '@storybook/react'
import { Row, Snippet, Stack, Text } from '@ultraviolet/ui'
import * as CategoryIcon from '..'
import { DEPRECATED_ICONS } from '../../../deprecatedIcons'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CategoryIcon).map(iconName => {
      const FoundCategoryIcon =
        CategoryIcon[iconName as keyof typeof CategoryIcon]

      const deprecated = DEPRECATED_ICONS.find(icon => icon.name === iconName)

      return (
        <Stack key={iconName} direction="row" alignItems="center" gap={2}>
          <Row templateColumns="repeat(3, 3fr)" gap={1} alignItems="center">
            <FoundCategoryIcon />
            <FoundCategoryIcon {...props} variant="neutral" />
            <FoundCategoryIcon {...props} disabled />
          </Row>
          <div style={{ width: '880px' }}>
            <Text as="code" variant="code" strikeThrough={!!deprecated}>
              <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/category'`}</Snippet>
            </Text>
          </div>
          {deprecated ? (
            <Text as="span" variant="bodySmall">
              <Text as="span" variant="bodySmallStrong" sentiment="danger">
                Deprecated:&nbsp;
              </Text>
              {deprecated.deprecatedReason}
            </Text>
          ) : null}
        </Stack>
      )
    })}
  </Stack>
)
