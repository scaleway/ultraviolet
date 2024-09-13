import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import { OutlookLogo } from '..'

export const Sizes: StoryFn<typeof OutlookLogo> = props => (
  <Stack gap={1}>
    {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
      <Stack direction="row" gap={1} alignItems="center" key={size}>
        <OutlookLogo {...props} size={size} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
