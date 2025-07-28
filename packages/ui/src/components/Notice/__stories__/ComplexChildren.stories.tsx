import type { ComponentProps } from 'react'
import { Link } from '../../Link'
import { Text } from '../../Text'
import { Notice } from '..'

export const ComplexChildren = (args: ComponentProps<typeof Notice>) => (
  <Notice {...args}>
    <Text as="p" variant="caption">
      This is a link to&nbsp;
      <Link href="//google.com" size="small" target="_blank">
        Google
      </Link>
    </Text>
  </Notice>
)

ComplexChildren.parameters = {
  docs: {
    description: { story: 'You can also pass complex children' },
  },
}
