import { Meta, Story } from '@storybook/react'
import React from 'react'
import TagsPoplist, { TagsPoplistProps } from '..'

export default {
  component: TagsPoplist,
  parameters: {
    docs: {
      description: {
        component:
          'List of tags mixed with tooltip tags depending on configuration limit.',
      },
    },
  },
  title: 'Components/Data Display/TagsPopList',
} as Meta

const Template: Story<TagsPoplistProps> = args => (
  <TagsPoplist tags={['smooth', 'code']} {...args} />
)

export const Default = Template.bind({})

export const Threshold = Template.bind({})
Threshold.parameters = {
  docs: {
    description: {
      story:
        '`threshold` prop defines the number of tags to display before hiding them into a tooltip.',
    },
  },
}

Threshold.args = {
  tags: [
    'very',
    ...Array<string>(50).fill('large'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 5,
}

export const TagWidth = Template.bind({})
TagWidth.parameters = {
  docs: {
    description: {
      story:
        '`maxTagWidth` can be used for defining max width of each tags except the ones in tooltip.',
    },
  },
}
TagWidth.args = {
  maxTagWidth: 30,
  tags: [
    'very',
    ...Array<string>(50).fill('large'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 5,
}

export const Multiline = Template.bind({})
Multiline.parameters = {
  docs: {
    description: {
      story: '`multiline` can be used to allow a multilined tag container.',
    },
  },
}

Multiline.decorators = [
  TagWidthStory => (
    <div style={{ width: '500px' }}>
      <TagWidthStory />
    </div>
  ),
]
Multiline.args = {
  multiline: true,
  tags: [
    'very',
    ...Array<string>(50).fill('item'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 55,
}
