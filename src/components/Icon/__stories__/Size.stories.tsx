import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Icon from '..'

const sizes: ComponentProps<typeof Icon>['size'][] = [40, 50, 60]

export const Size = (args: ComponentProps<typeof Icon>) =>
  sizes.map(size => <Icon key={size} name="eye" size={size} {...args} />)

Size.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}

Size.decorators = [
  Story => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
