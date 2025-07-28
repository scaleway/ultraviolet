import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Link } from '..'

const sizes: ComponentProps<typeof Link>['size'][] = [
  'large',
  'small',
  'xsmall',
]

export const Size = (props: ComponentProps<typeof Link>) =>
  sizes.map(size => (
    <Link key={size} {...props} size={size}>
      {size}
    </Link>
  ))

Size.parameters = {
  docs: {
    description: { story: 'Edit `size` prop to change the size of the text' },
  },
}

Size.decorators = [
  Story => (
    <Stack>
      <Story />
    </Stack>
  ),
] as Decorator[]
