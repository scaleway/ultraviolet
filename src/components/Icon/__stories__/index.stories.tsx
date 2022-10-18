import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Icon, { icons } from '..'

export default {
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'Allow you to display an svg icon',
      },
    },
  },
  title: 'Components/Token/Icon',
} as Meta

const Template: Story<ComponentProps<typeof Icon>> = args => <Icon {...args} />

export const Default = Template.bind({})

export const Name = Template.bind({})
Name.parameters = {
  docs: {
    storyDescription: 'Set desired icon using `name` property.',
  },
}
Name.decorators = [
  () => (
    <>
      {icons.map(name => (
        <div key={name} style={{ fontSize: '1.3em', margin: '8px 0' }}>
          <Icon name={name} /> {name}
        </div>
      ))}
    </>
  ),
]

export const Size = Template.bind({})
Size.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}
Size.decorators = [
  () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Icon name="eye" size={40} />
      <Icon name="eye" size={50} />
      <Icon name="eye" size={60} />
    </div>
  ),
]

export const Color = Template.bind({})
Color.parameters = {
  docs: {
    storyDescription:
      "Set color using `color` property. (doesn't work with `compute, iot, network, storage, tools` icons which are already colored)",
  },
}
Color.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Icon name="eye" color="primary" />
      <Icon name="eye" color="success" />
      <Icon name="eye" color="warning" />
    </div>
  ),
]

export const UnknownOrUndefined = Template.bind({})
UnknownOrUndefined.parameters = {
  docs: {
    storyDescription:
      'If name is `undefined` or not found warning is sent and default circle icon is displayed.',
  },
}
UnknownOrUndefined.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Icon name={undefined} color="danger" />
      {/* @ts-expect-error we test an unknown icon name */}
      <Icon name="unknown" color="warning" />
    </div>
  ),
]
