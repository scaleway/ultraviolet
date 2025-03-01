import type { StoryFn } from '@storybook/react'
import { Snippet, Stack, Text } from '@ultraviolet/ui'
import * as ProductIcon from '..'
import { DEPRECATED_ICONS } from '../../../deprecatedIcons'

export const List: StoryFn = props => (
  <Stack gap={1}>
    {Object.keys(ProductIcon).map(iconName => {
      const FoundProductIcon = ProductIcon[iconName as keyof typeof ProductIcon]
      const deprecated = DEPRECATED_ICONS.find(icon => icon.name === iconName)

      return (
        <Stack direction="row" gap={1} alignItems="center" key={iconName}>
          <FoundProductIcon size="large" {...props} />
          <div style={{ width: '880px' }}>
            <Text as="code" variant="code" strikeThrough={!!deprecated}>
              <Snippet>
                {`import { ${iconName} } from '@ultraviolet/icons/product'`}
              </Snippet>
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
