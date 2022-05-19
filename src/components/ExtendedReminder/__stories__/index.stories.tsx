import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import ExtendedReminder, { variants } from '..'

export default {
  component: ExtendedReminder,
  parameters: {
    docs: {
      description: {
        component:
          'ExtendedReminder is a component to display multiple information in a single container. To make it work you need to pass `title`, `badgeText` and `text` props at least.',
      },
    },
  },
  title: 'Components/Feeback/ExtendedReminder',
} as Meta

const Template: Story<ComponentProps<typeof ExtendedReminder>> = ({
  badgeText = 'default badge text',
  icon = 'information-outline',
  text = 'default text',
  title = 'title',
  ...args
}) => (
  <ExtendedReminder
    badgeText={badgeText}
    icon={icon}
    text={text}
    title={title}
    {...args}
  />
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'By using `variant` prop you can cusomize the component.',
  },
}

Variants.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(
        Object.keys(variants) as ComponentProps<
          typeof ExtendedReminder
        >['variant'][]
      ).map(variant => (
        <ExtendedReminder
          key={variant}
          variant={variant}
          icon="alert"
          badgeText={`${variant as string} variant`}
          title="Reminder title"
          text="Reminder text"
        />
      ))}
    </div>
  ),
]

export const OnClick = Template.bind({})
OnClick.parameters = {
  docs: {
    storyDescription:
      'By using `onClick` prop you can add an event listener when the user click on the component',
  },
}
OnClick.decorators = [
  () => (
    <ExtendedReminder
      icon="circle"
      badgeText="onClick (toggle your console)"
      onClick={() => console.log('clicked')}
      title="Verify your credit card"
      text="Enter the code we send to your bank account to validate your payment method."
    />
  ),
]

export const Icon = Template.bind({})
Icon.parameters = {
  docs: {
    storyDescription: 'By using `icon` prop you set the icon to use',
  },
}
Icon.decorators = [
  () => (
    <ExtendedReminder
      icon="alert"
      badgeText="Custom icon on my left"
      title="Verify your credit card"
      text="Enter the code we send to your bank account to validate your payment method."
    />
  ),
]

export const Link = Template.bind({})
Link.parameters = {
  docs: {
    storyDescription:
      'If you pass a `linkText` props there will be a link at the end of the block that redirect to the link set in `to` prop.',
  },
}
Link.decorators = [
  () => (
    <ExtendedReminder
      variant="warning"
      icon="alert"
      badgeText="10 days remaining"
      title="Verify your credit card"
      text="Enter the code we send to your bank account to validate your payment method."
      linkText="Verify my credit card"
      to="/"
    />
  ),
]
