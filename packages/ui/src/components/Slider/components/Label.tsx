import { Icon } from '@ultraviolet/icons/legacy'
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
    >
      {label}
    </Text>
    {required ? <Icon name="asterisk" sentiment="danger" size={8} /> : null}
  </Stack>
)
