import type { StoryFn } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import { DEPRECATED_ICONS } from '../../../deprecatedIcons'
import * as ProductIcon from '..'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ProductIcon).map(iconName => {
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
      const FoundProductIcon = ProductIcon[iconName as keyof typeof ProductIcon]
      const deprecated = DEPRECATED_ICONS.find(icon => icon.name === iconName)

      return (
        <Stack alignItems="center" direction="row" gap={1} key={iconName}>
          <FoundProductIcon size="large" {...props} />
          <div style={{ width: '880px' }}>
            <Text as="code" strikeThrough={!!deprecated} variant="code">
              <Snippet>
                {`import { ${iconName} } from '@ultraviolet/icons/product/${iconName}'`}
              </Snippet>
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
