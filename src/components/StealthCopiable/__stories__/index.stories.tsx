import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import StealthCopiable from '..'
import Typography from '../../Typography'

export default {
  component: StealthCopiable,
  parameters: {
    docs: {
      description: {
        component:
          'Display a copy button on hover that will copy text into clipboard.',
      },
    },
  },
  title: 'Components/Data Display/StealthCopiable',
} as Meta

const Template: Story<ComponentProps<typeof StealthCopiable>> = args => (
  <StealthCopiable {...args}>Hover me and copy me</StealthCopiable>
)

export const Default = Template.bind({})

export const Side = Template.bind({})
Side.parameters = {
  docs: {
    storyDescription:
      'Use `side` to position copy button on left or on the right of the text.',
  },
}
Side.decorators = [
  () => (
    <>
      <StealthCopiable side="left">
        Hover me and copy me from the left
      </StealthCopiable>
      <StealthCopiable side="right">
        Hover me and copy me from the right
      </StealthCopiable>
    </>
  ),
]

export const CustomText = Template.bind({})
CustomText.parameters = {
  docs: {
    storyDescription: 'Use `copyText` and `copiedText` to text of copy button.',
  },
}
CustomText.decorators = [
  () => (
    <StealthCopiable copyText="📋" copiedText="🎉">
      Hover me and copy me with a suprise
    </StealthCopiable>
  ),
]

export const ComplexChildren = Template.bind({})
ComplexChildren.decorators = [
  () => (
    <StealthCopiable>
      <Typography variant="command">I&apos;m a command Typography</Typography>
    </StealthCopiable>
  ),
]
