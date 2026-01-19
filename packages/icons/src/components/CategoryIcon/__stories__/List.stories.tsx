import type { StoryFn } from '@storybook/react-vite'
import { Row, Snippet, Stack, Text } from '@ultraviolet/ui'
import { DEPRECATED_ICONS } from '../../../deprecatedIcons'
import * as CategoryIcon from '..'

export const List: StoryFn<typeof CategoryIcon> = props => (
  <Stack gap={1}>
    {Object.keys(CategoryIcon).map(iconName => {
      const FoundCategoryIcon =
        // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
        CategoryIcon[iconName as keyof typeof CategoryIcon]

      const deprecated = DEPRECATED_ICONS.find(icon => icon.name === iconName)

      return (
        <Stack alignItems="center" direction="row" gap={2} key={iconName}>
          <Row alignItems="center" gap={1} templateColumns="repeat(3, 3fr)">
            <FoundCategoryIcon />
            <FoundCategoryIcon {...props} variant="neutral" />
            <FoundCategoryIcon {...props} disabled />
          </Row>
          <div style={{ width: '880px' }}>
            <Text as="code" strikeThrough={!!deprecated} variant="code">
              <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/category'`}</Snippet>
            </Text>
          </div>
          {deprecated ? (
            <Text as="span" variant="bodySmall">
              <Text as="span" sentiment="danger" variant="bodySmallStrong">
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
