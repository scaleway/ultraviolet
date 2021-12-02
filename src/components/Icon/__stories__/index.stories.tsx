import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Icon, { icons } from '..'
import { Box, Boxer } from '../..'

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
        <Box my={1} key={name} style={{ fontSize: '1.3em' }}>
          <Icon name={name} /> {name}
        </Box>
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
    <Boxer mr={2} display="inline-block">
      <Icon name="eye" size={40} />
      <Icon name="eye" size={50} />
      <Icon name="eye" size={60} />
    </Boxer>
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
    <Boxer mr={2} display="inline-block">
      <Icon name="eye" color="primary" />
      <Icon name="eye" color="success" />
      <Icon name="eye" color="warning" />
    </Boxer>
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
    <Boxer mr={2} display="inline-block">
      <Icon name={undefined} color="red" />
      <Icon name="unknown" color="orange" />
    </Boxer>
  ),
]

export const VerticalAlign = Template.bind({})
VerticalAlign.parameters = {
  docs: {
    storyDescription:
      '`Icon` is based on `Box`component which allow declarative css like `verticalAlign` in this example.',
  },
}
VerticalAlign.decorators = [
  () => (
    <Boxer display="flex">
      {['top', 'middle', 'bottom'].map(align => (
        <Box m={1}>
          <Icon name="eye" verticalAlign={align} /> {align}
        </Box>
      ))}
    </Boxer>
  ),
]
