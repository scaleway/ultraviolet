import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Avatar from '..'
import support from './support.svg'

export default {
  component: Avatar,
  title: 'Components/Data Display/Avatar',
} as Meta

const Template: Story<ComponentProps<typeof Avatar>> = args => (
  <Avatar {...args} />
)

export const Default = Template.bind({})

export const Image = Template.bind({})
Image.parameters = {
  docs: {
    storyDescription:
      'You can change the default image by using the `image` prop. It work as `src` on a img tag.',
  },
}
Image.decorators = [() => <Avatar image={support} />]

export const Size = Template.bind({})
Size.args = {
  size: 48,
}
Size.parameters = {
  docs: {
    storyDescription:
      'You can change the default Size by using the `Size` prop. It work as `src` on a img tag.',
  },
}

export const Text = Template.bind({})
Text.parameters = {
  docs: {
    storyDescription:
      'Instead of having an image you can put a text and it will take the best acronym to displayYou can change the default Text by using the `Text` prop. It work as `src` on a img tag.',
  },
}
Text.decorators = [
  () => (
    <>
      {['Hello', 'Hello you', 'This is really long text for an acronym'].map(
        text => (
          <div key={text} style={{ display: 'inline-flex', marginRight: 8 }}>
            <Avatar text={text} />
          </div>
        ),
      )}
    </>
  ),
]

export const TextSize = Template.bind({})
TextSize.parameters = {
  docs: {
    storyDescription:
      'Additionnally you can set the size of the text by using `textSize` prop. Don&lsquo;t forget to set the `size` prop to make your text fit into the component.',
  },
}
TextSize.decorators = [
  () => (
    <>
      {[
        [20, 10],
        [40, 20],
        [50, 30],
        [80, 50],
      ].map(sizes => (
        <div
          key={sizes.toString()}
          style={{ display: 'inline-flex', marginRight: 8 }}
        >
          <Avatar size={sizes[0]} textSize={sizes[1]} text="Hello You" />
        </div>
      ))}
    </>
  ),
]

export const TextColor = Template.bind({})
TextColor.args = {
  text: 'Hello You',
  textColor: 'black',
}
TextColor.parameters = {
  docs: {
    storyDescription: 'You can set the text color by setting `textColor` prop',
  },
}

export const BackgroundColor = Template.bind({})
BackgroundColor.args = {
  text: 'Hello You',
  textBgColor: 'warning',
}
BackgroundColor.parameters = {
  docs: {
    storyDescription:
      'You can set the background color when using text by setting `textBgColor` prop',
  },
}

export const Lock = Template.bind({})
Lock.parameters = {
  docs: {
    storyDescription:
      'You can set the component to be locked by using `lock` prop when `text` is specified.',
  },
}
Lock.decorators = [
  () => (
    <>
      <div style={{ display: 'inline-flex', marginRight: 8 }}>
        <Avatar text="Hello You" lock />
      </div>
      <div style={{ display: 'inline-flex' }}>
        <Avatar size={48} textSize={32} text="Hello You" lock />
      </div>
    </>
  ),
]
