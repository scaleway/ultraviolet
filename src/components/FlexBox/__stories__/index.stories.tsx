import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import FlexBox from '..'

export default {
  component: FlexBox,
  title: 'Components/Foundation/FlexBox',
} as Meta

const Template: Story<ComponentProps<typeof FlexBox>> = args => (
  <FlexBox {...args}>I&apos;m a flexbox</FlexBox>
)

export const Default = Template.bind({})

export const Child = Template.bind({})
Child.parameters = {
  docs: {
    storyDescription: 'FlexBox.Child represent a flex children',
  },
}
Child.decorators = [
  () => (
    <FlexBox justifyContent="space-between">
      <FlexBox.Child>First Child</FlexBox.Child>
      <FlexBox.Child>Second Child</FlexBox.Child>
    </FlexBox>
  ),
]

export const Nested = Template.bind({})
Nested.parameters = {
  docs: {
    storyDescription:
      'A `FlexBox` also accepts `FlexBox.Child` props in order to be able to be nested',
  },
}
Nested.decorators = [
  () => (
    <FlexBox justifyContent="space-between">
      <FlexBox flex={1}>
        <FlexBox.Child flex={1}>First Nested Child</FlexBox.Child>
        <FlexBox.Child flex={1}>Second Nested Child</FlexBox.Child>
      </FlexBox>
      <FlexBox.Child flex={1} order={-1}>
        Second Child (with custom order)
      </FlexBox.Child>
    </FlexBox>
  ),
]
