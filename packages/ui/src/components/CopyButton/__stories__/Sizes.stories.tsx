import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { CopyButton } from '../index'

const StyledText = styled(Text)`
  min-width: 80px;
`

export const Sizes = (props: ComponentProps<typeof CopyButton>) => (
  <Stack gap={1}>
    {(['xsmall', 'small', 'medium', 'large'] as const).map(size => (
      <Stack direction="row" gap={1} key={size}>
        <StyledText as="span" variant="body">
          {size}:
        </StyledText>
        <CopyButton {...props} size={size} value="Text that will be copied" />
      </Stack>
    ))}
  </Stack>
)
