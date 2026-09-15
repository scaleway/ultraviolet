import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../../Layout/Stack'

export const Target = (props: ComponentProps<typeof Link>) => (
  <Stack gap={2}>
    <Link {...props} href={undefined}>
      External link not visited
    </Link>
    <Link {...props}>External link visited</Link>
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
