import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Description from '..'

export default {
  component: Description,
  parameters: {
    docs: {
      description: {
        component:
          'Terms and descriptions with `dl`, `dt` and `dd` native html tag.',
      },
    },
  },
  title: 'Components/Data Display/Description',
} as Meta

const Template: Story<ComponentProps<typeof Description>> = args => (
  <Description {...args}>
    <Description.Term>Name</Description.Term>
    <Description.Desc>Big instance</Description.Desc>
    <Description.Term>Size</Description.Term>
    <Description.Desc>125 GB</Description.Desc>
  </Description>
)

export const Default = Template.bind({})

export const Inline = Template.bind({})
Inline.parameters = {
  docs: {
    storyDescription: 'Display it as inline using `inline` prop.',
  },
}
Inline.decorators = [
  () => (
    <Description inline>
      <Description.Term>Name</Description.Term>
      <Description.Desc>Big instance</Description.Desc>
      <Description.Term>Size</Description.Term>
      <Description.Desc>125 GB</Description.Desc>
    </Description>
  ),
]

export const Selectable = Template.bind({})
Selectable.parameters = {
  docs: {
    storyDescription: 'Make description selectable using `selectable` prop.',
  },
}
Selectable.decorators = [
  () => (
    <Description inline selectable>
      <Description.Term>Name</Description.Term>
      <Description.Desc>Big instance</Description.Desc>
      <Description.Term>Size</Description.Term>
      <Description.Desc>125 GB</Description.Desc>
    </Description>
  ),
]
