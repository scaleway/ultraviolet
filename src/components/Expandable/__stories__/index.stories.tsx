import { Meta, Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import Expandable from '..'
import Button from '../../Button'

export default {
  component: Expandable,
  parameters: {
    docs: {
      description: {
        component:
          'An Expandable is a container that can hide or show its content',
      },
    },
  },
  title: 'Components/Expandable',
} as Meta

const Template: Story<ComponentProps<typeof Expandable>> = args => {
  const [toggled, onToggle] = useState(false)
  const toggle = () => onToggle(state => !state)

  return (
    <>
      <Button
        icon={toggled ? 'minus-box-outline' : 'plus-box-outline'}
        onClick={toggle}
      >
        Click me
      </Button>
      <Expandable height={24} opened={toggled} {...args}>
        I&lsquo;m an Expandable content
      </Expandable>
    </>
  )
}

export const Default = Template.bind({})

export const Opened = Template.bind({})
Opened.parameters = {
  docs: {
    storyDescription:
      'Set `opened` prop to show or hide the content of an Expandable.',
  },
}
Opened.decorators = [
  () => {
    const [toggled, onToggle] = useState(false)
    const toggle = () => onToggle(state => !state)

    return (
      <>
        <Button
          icon={toggled ? 'minus-box-outline' : 'plus-box-outline'}
          onClick={toggle}
        >
          Click me to {toggled ? 'hide' : 'show'} content
        </Button>
        <Expandable opened={toggled}>
          I&lsquo;m a visible Expandable content
        </Expandable>
      </>
    )
  },
]

export const Height = Template.bind({})
Height.parameters = {
  docs: {
    storyDescription:
      'Set `height` prop to have a beautiful animation when opening and closing. Put something near your content height.',
  },
}
Height.decorators = [
  () => {
    const [toggled, onToggle] = useState(false)
    const toggle = () => onToggle(state => !state)

    return (
      <>
        <Button
          icon={toggled ? 'minus-box-outline' : 'plus-box-outline'}
          onClick={toggle}
        >
          Click me to {toggled ? 'hide' : 'show'} content
        </Button>
        <Expandable height={500} opened={toggled}>
          I&lsquo;m an Expandable content with a beautiful animation
        </Expandable>
      </>
    )
  },
]
