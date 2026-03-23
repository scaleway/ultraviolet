import { Snippet, Stack, Text } from '@ultraviolet/ui'

import * as ProductIcon from '..'

import type { StoryFn } from '@storybook/react-vite'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ProductIcon).map(iconName => {
      const FoundProductIcon = ProductIcon[iconName as keyof typeof ProductIcon]

      return (
        <Stack alignItems="center" direction="row" gap={1} key={iconName}>
          <FoundProductIcon size="large" {...props} />
          <Text as="span" variant="bodyStrong">
            <Snippet>{`import { ${iconName} } from '@ultraviolet/icons/logo/${iconName}'`}</Snippet>
          </Text>
        </Stack>
      )
    })}
  </Stack>
)
