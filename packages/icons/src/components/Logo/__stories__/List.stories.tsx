import type { StoryFn } from '@storybook/react-vite'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import * as ProductIcon from '..'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ProductIcon).map(iconName => {
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
      const FoundProductIcon = ProductIcon[iconName as keyof typeof ProductIcon]

      return (
        <Stack alignItems="center" direction="row" gap={1} key={iconName}>
          <FoundProductIcon size="large" {...props} />
          <Text as="span" variant="bodyStrong">
            <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/logo'`}</Snippet>
          </Text>
        </Stack>
      )
    })}
  </Stack>
)
