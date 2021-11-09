import { Meta, Story } from '@storybook/react'
import React from 'react'
import Reminder, { ReminderProps, variants } from '..'

export default {
  component: Reminder,
  parameters: {
    docs: {
      description: {
        component:
          'A styled badge with extra feature. In the `text` prop place some text between `[]` to make it bolder',
      },
    },
  },
  title: 'Components/Feedback/Reminder',
} as Meta

const Template: Story<ReminderProps> = args => (
  <Reminder text="Your credit card [has expired]" {...args} />
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Use `variant` prop to change the style of the component.',
  },
}
Variants.decorators = [
  () => (
    <>
      {Object.keys(variants).map(variant => (
        <Reminder key={variant} variant={variant} mb={1} text={variant} />
      ))}
    </>
  ),
]

export const Link = Template.bind({})
Link.parameters = {
  docs: {
    storyDescription: 'Use `to` prop to make this component act as a link.',
  },
}
Link.decorators = [
  () => (
    <>
      <Reminder
        to="."
        mb={1}
        variant="error"
        text="Your credit card [has expired]"
      />
      <Reminder
        to="."
        mb={1}
        variant="warning"
        text="You have [1 locked instance]"
      />
      <Reminder to="." mb={1} variant="info" text="[2FA] is deactivated" />
      <Reminder to="." mb={1} text="No [phone number] registered" />
    </>
  ),
]

export const Bordered = Template.bind({})
Bordered.parameters = {
  docs: {
    storyDescription:
      'Add `bordered` prop to display a border around the component.',
  },
}
Bordered.decorators = [
  () => (
    <>
      <Reminder
        to="/"
        mb={1}
        bordered
        variant="error"
        text="Your credit card [has expired]"
      />
      <Reminder
        to="/"
        mb={1}
        bordered
        variant="warning"
        text="You have [1 locked instance]"
      />
      <Reminder
        to="/"
        mb={1}
        bordered
        variant="info"
        text="[2FA] is deactivated"
      />
      <Reminder to="/" mb={1} bordered text="No [phone number] registered" />
    </>
  ),
]
