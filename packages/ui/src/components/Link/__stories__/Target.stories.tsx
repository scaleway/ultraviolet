import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'

const sizes = ['large', 'small', 'xsmall'] as const

export const Target = (props: ComponentProps<typeof Link>) => (
  <Stack gap={2}>
    <Stack direction="row" alignItems="end" gap="3">
      {sizes.map(size => (
        <Link key={size} {...props} href={undefined} size={size} target="_blank">
          {size}
        </Link>
      ))}
    </Stack>
    <Stack direction="row" alignItems="end" gap="3">
      {sizes.map(size => (
        <Link key={size} {...props} size={size} target="_blank">
          {size}
        </Link>
      ))}
    </Stack>
  </Stack>
)

Target.parameters = {
  docs: {
    description: {
      story:
        'Edit the `target` property to specify the target you want for your link. External links (`target="_blank"`) have an arrow icon automatically added, they have an `info` sentiment by default, and can have a visited state.',
    },
  },
}

Target.args = {
  href: 'https://scaleway.com',
  target: '_blank',
}
