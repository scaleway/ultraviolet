import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Tag from '..'
import { SENTIMENTS } from '../../../theme'

export default {
  component: Tag,
  title: 'Components/Data Display/Tag',
} as Meta

const Template: Story<ComponentProps<typeof Tag>> = args => (
  <Tag {...args}>Tag</Tag>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    description: {
      story:
        'Variants defines different colors of you component. You can define it using `variant` property.',
    },
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SENTIMENTS.map(sentiment => (
        <Tag key={sentiment} variant={sentiment} onClose={() => {}}>
          {sentiment}
        </Tag>
      ))}
    </div>
  ),
]

export const Icons = Template.bind({})
Icons.parameters = {
  docs: {
    description: {
      story:
        'Add Icon on left side of your tag, You can define it using `icon` property.',
    },
  },
}
Icons.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SENTIMENTS.map(sentiment => (
        <Tag key={sentiment} variant={sentiment} icon="check">
          {sentiment}
        </Tag>
      ))}
    </div>
  ),
]

export const onClose = Template.bind({})
onClose.parameters = {
  docs: {
    description: {
      story:
        '`onClose` property to pass function trigger on click on close button.',
    },
  },
}
onClose.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SENTIMENTS.map(sentiment => (
        <Tag
          key={sentiment}
          variant={sentiment}
          icon="check"
          onClose={() => {}}
        >
          {sentiment}
        </Tag>
      ))}
    </div>
  ),
]

export const Loading = Template.bind({})
Loading.parameters = {
  docs: {
    description: {
      story:
        'Loading for async operation or other use cases, You can define it by passing `isLoading` property to true.',
    },
  },
}
Loading.decorators = [
  () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SENTIMENTS.map(sentiment => (
        <Tag key={sentiment} variant={sentiment} icon="check" isLoading>
          {sentiment}
        </Tag>
      ))}
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
