import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Alert, { alertTypes, alertVariants } from '..'
import { Button, Typography } from '../../index'

export default {
  component: Alert,
  title: 'Components/Feedback/Alert',
} as Meta

const Template: Story<ComponentProps<typeof Alert>> = args => (
  <Alert {...args}>This is an alert</Alert>
)

export const Default = Template.bind({})

export const Types = Template.bind({})
Types.parameters = {
  docs: {
    storyDescription:
      'Using `type` prop you can change the type of the component. Each type has a default icon set.',
  },
}
Types.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {alertTypes.map(type => (
        <Alert key={type} type={type}>
          This is a notification bar with the {type} variant.
        </Alert>
      ))}
    </div>
  ),
]

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Using `variant` prop you can change the style of the component.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {alertVariants.map(variant => (
        <Alert key={variant} type="info" variant={variant}>
          This is a notification bar with the {variant} variant.
        </Alert>
      ))}
    </div>
  ),
]

export const Title = Template.bind({})
Title.parameters = {
  docs: {
    storyDescription:
      'Using `title` prop you can add a custom title to the notification.',
  },
}
Title.decorators = [
  () => (
    <Alert icon="information-outline" type="info" title="Information">
      This is a notification bar with a custom title.
    </Alert>
  ),
]

export const Icon = Template.bind({})
Icon.parameters = {
  docs: {
    storyDescription:
      'Using `icon` prop you can add a custom icon to the notification.',
  },
}
Icon.decorators = [
  () => (
    <Alert icon="clock-outline" type="beta">
      This is a notification bar with a custom icon.
    </Alert>
  ),
]

export const IconSize = Template.bind({})
IconSize.parameters = {
  docs: {
    storyDescription: 'Using `iconSize` prop you can change the icon size.',
  },
}
IconSize.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert iconSize={24}>
        This is a notification bar with a custom icon size.
      </Alert>
      <Alert iconSize={40} type="info">
        This is a notification bar with a custom icon size.
      </Alert>
    </div>
  ),
]

export const AdvancedChildren = Template.bind({})
AdvancedChildren.parameters = {
  docs: {
    storyDescription:
      'If you want to add more information into your alert you can simply pass it to Alert component as children.',
  },
}
AdvancedChildren.decorators = [
  () => (
    <div>
      <Alert type="warning">
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            justifyContent: 'space-between',
          }}
        >
          <Typography color="danger">I am a complex children</Typography>
          <Button variant="warning">With a button</Button>
        </div>
      </Alert>
    </div>
  ),
]
