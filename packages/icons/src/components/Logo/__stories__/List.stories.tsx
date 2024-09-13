import type { StoryFn } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import * as ProductIcon from '..'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ProductIcon).map(iconName => {
      const FoundProductIcon = ProductIcon[iconName as keyof typeof ProductIcon]

      return (
        <Stack direction="row" gap={1} alignItems="center">
          <FoundProductIcon size="large" {...props} />
          <Text as="span" variant="bodyStrong">
            <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/logo'`}</Snippet>
          </Text>
        </Stack>
      )
    })}
  </Stack>
)
