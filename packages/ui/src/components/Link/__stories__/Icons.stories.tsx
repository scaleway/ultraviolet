import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'

const sizes = ['large', 'small', 'xsmall'] as const

export const Icons = (props: ComponentProps<typeof Link>) => (
  <Stack gap={2}>
    <Stack direction="row" alignItems="end" gap="3">
      {sizes.map(size => (
        <Link key={size} {...props} size={size} iconPosition="left">
          {size}
        </Link>
      ))}
    </Stack>
    <Stack direction="row" alignItems="end" gap="3">
      {sizes.map(size => (
        <Link key={size} {...props} size={size} iconPosition="right">
          {size}
        </Link>
      ))}
    </Stack>
  </Stack>
)

Icons.parameters = {
  docs: {
    description: { story: 'Add an arrow icon on the left or right with the `iconPosition` property.' },
  },
}
