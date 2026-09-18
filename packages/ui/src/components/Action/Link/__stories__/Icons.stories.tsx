import { AttachIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../../Layout/Stack'
import { SIZES } from '../constants'

export const Icons = (props: ComponentProps<typeof Link>) => (
  <Stack gap={2}>
    <Stack direction="row" alignItems="end" gap="3">
      {SIZES.map(size => (
        <Link key={size} {...props} size={size} iconPosition="left">
          {size}
        </Link>
      ))}
    </Stack>
    <Stack direction="row" alignItems="end" gap="3">
      {SIZES.map(size => (
        <Link key={size} {...props} size={size} iconPosition="right">
          {size}
        </Link>
      ))}
    </Stack>
    <Stack direction="row" alignItems="end" gap="3">
      <Link {...props}>
        Anchor <AttachIcon />
      </Link>
    </Stack>
  </Stack>
)

Icons.parameters = {
  docs: {
    description: { story: 'Add an arrow icon on the left or right with the `iconPosition` property.' },
  },
}
