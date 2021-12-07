import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Badge, { badgeSizes, badgeVariants } from '..'

export default {
  component: Badge,
  title: 'Components/Data Display/Badge',
} as Meta

const Template: Story<ComponentProps<typeof Badge>> = args => (
  <Badge {...args}>A Badge</Badge>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
Variants.decorators = [
  () => (
    <>
      {badgeVariants.map(variant => (
        <Badge key={variant} m={1} variant={variant}>
          {variant}
        </Badge>
      ))}
    </>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set `size` using size property.',
  },
}
Sizes.decorators = [
  () => (
    <>
      {badgeSizes.map(size => (
        <Badge key={size} size={size} mx={1}>
          {size}
        </Badge>
      ))}
    </>
  ),
]
