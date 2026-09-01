import { Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { AlertCircleIcon } from '../__generated__'
import { SIZES } from '../constants'

export const Size = (args: ComponentProps<typeof AlertCircleIcon>) => (
  <Stack gap={1}>
    {Object.keys(SIZES).map(size => (
      <Stack direction="row" alignItems={'center'} gap={2}>
        <AlertCircleIcon size={size as keyof typeof SIZES} {...args} />{' '}
        <Text as="span" variant="bodyStrong">
          {size}
        </Text>
      </Stack>
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: { story: 'Set size using `size` property.' },
  },
}
