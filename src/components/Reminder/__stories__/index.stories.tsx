import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Reminder, { variants } from '..'

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

const Template: Story<ComponentProps<typeof Reminder>> = ({
  text = 'Your credit card [has expired]',
  ...args
}) => <Reminder text={text} {...args} />

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {variants.map(variant => (
        <Reminder key={variant} variant={variant} text={variant} />
      ))}
    </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Reminder to="." variant="error" text="Your credit card [has expired]" />
      <Reminder to="." variant="warning" text="You have [1 locked instance]" />
      <Reminder to="." variant="info" text="[2FA] is deactivated" />
      <Reminder to="." text="No [phone number] registered" />
    </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Reminder
        to="/"
        bordered
        variant="error"
        text="Your credit card [has expired]"
      />
      <Reminder
        to="/"
        bordered
        variant="warning"
        text="You have [1 locked instance]"
      />
      <Reminder to="/" bordered variant="info" text="[2FA] is deactivated" />
      <Reminder to="/" bordered text="No [phone number] registered" />
    </div>
  ),
]
