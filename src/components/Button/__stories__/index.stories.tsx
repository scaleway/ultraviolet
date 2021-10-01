import { Meta, Story } from '@storybook/react'
import React from 'react'
import Button, { ButtonProps, buttonVariants } from '..'

export default {
  component: Button,
  title: 'Components/Button/Button',
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.decorators = [
  () => (
    <>
      {buttonVariants.map(variant => (
        <Button key={variant} variant={variant} mr={2} mb={2}>
          {variant}
        </Button>
      ))}
    </>
  ),
]
