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
    storyDescription:
      '`threshold` prop defines the number of tags to display before hiding them into a tooltip.',
  },
}
Threshold.decorators = [
  () => (
    <div style={{ width: 350 }}>
      <TagsPoplist
        threshold={5}
        tags={[
          'very',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'tooltip',
          'scaleway',
          'paris',
          'cloud',
        ]}
      />
    </div>
  ),
]

export const TagWidth = Template.bind({})
TagWidth.parameters = {
  docs: {
    storyDescription:
      '`maxTagWidth` can be used for defining max width of each tags except the ones in tooltip.',
  },
}
TagWidth.decorators = [
  () => (
    <div style={{ width: 350 }}>
      <TagsPoplist
        threshold={5}
        maxTagWidth={30}
        tags={[
          'very',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'large',
          'tooltip',
          'scaleway',
          'paris',
          'cloud',
        ]}
      />
    </div>
  ),
]
