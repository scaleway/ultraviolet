import type { ComponentProps } from 'react'
import { Notice } from '..'
import { Link } from '../../Link'
import { Text } from '../../Text'

export const ComplexChildren = (args: ComponentProps<typeof Notice>) => (
  <Notice {...args}>
    <Text as="p" variant="caption">
      This is a link to&nbsp;
      <Link href="//google.com" target="_blank" size="small">
        Google
      </Link>
    </Text>
  </Notice>
)

ComplexChildren.parameters = {
  docs: {
    storyDescription: 'You can also pass complex children',
  },
}
