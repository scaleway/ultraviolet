import { AsteriskIcon } from '@ultraviolet/icons'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import type { LabelProps } from '../types'

export const Label = ({
  direction,
  input,
  finalId,
  label,
  required,
}: LabelProps) => (
  <Stack
    gap={0.5}
    direction="row"
    alignItems={direction === 'row' && input ? 'center' : 'normal'}
  >
    <Text
      as="label"
      variant="bodyStrong"
      htmlFor={finalId}
      placement="left"
      sentiment="neutral"
      prominence="strong"
    >
      {label}
    </Text>
    {required ? <AsteriskIcon sentiment="danger" size={8} /> : null}
  </Stack>
)
