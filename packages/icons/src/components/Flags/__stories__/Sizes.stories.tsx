import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import { FranceFlag } from '../__generated__'
import { SIZES } from '../constant'

export const Sizes: StoryFn<typeof FranceFlag> = props => (
  <Stack gap={1}>
    {Object.keys(SIZES).map(size => (
      <Stack alignItems="center" direction="row" gap={1} key={size}>
        <FranceFlag {...props} size={size as keyof typeof SIZES} />
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)
