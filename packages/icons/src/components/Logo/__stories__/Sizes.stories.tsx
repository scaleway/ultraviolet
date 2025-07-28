import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import { OutlookLogo } from '../__generated__'

export const Sizes: StoryFn<typeof OutlookLogo> = props => (
  <Stack gap={1}>
    {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
      <Stack alignItems="center" direction="row" gap={1} key={size}>
        <OutlookLogo {...props} size={size} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
