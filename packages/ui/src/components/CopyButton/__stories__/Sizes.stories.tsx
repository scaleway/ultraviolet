import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { CopyButton } from '../index'

export const Sizes = (props: ComponentProps<typeof CopyButton>) => (
  <Stack gap={1}>
    {(['xsmall', 'small', 'medium', 'large'] as const).map(size => (
      <Stack direction="row" gap={1} key={size}>
        <Text as="span" style={{ minWidth: 80 }} variant="body">
          {size}:
        </Text>
        <CopyButton {...props} size={size} value="Text that will be copied" />
      </Stack>
    ))}
  </Stack>
)
