import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Toggle from '..'
import Icon from '../../Icon'
import Text from '../../Text'

export default {
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle button used to give an on / off state into a form.',
      },
    },
  },
  title: 'Components/Data Entry/Toggle',
} as Meta

const Template: Story<ComponentProps<typeof Toggle>> = ({
  checked: _checked,
  ...args
}) => <Toggle {...args} name="Toggle" />

export const Default = Template.bind({})

export const Label = Template.bind({})
Label.args = {
  label: 'Toggle me on',
  name: 'label',
}

export const ComplexLabel = Template.bind({})
ComplexLabel.parameters = {
  docs: {
    storyDescription:
      'Toggle can accept a more complex label than just a text, it allows your to customize even more the look of the toggle.',
  },
}
ComplexLabel.args = {
  label: (
    <div
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        gap: '8px',
        marginLeft: '8px',
      }}
    >
      <Icon name="lock" size={18} />
      <Text as="span" variant="body">
        Lock functionality
      </Text>
    </div>
  ),
  name: 'label',
}

export const LabelPosition = Template.bind({})
LabelPosition.parameters = {
  docs: {
    storyDescription:
      'Easily change the position of the label by passing `labelPosition` prop.',
  },
}
LabelPosition.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Template name="left" label="Left label" labelPosition="left" />
      <Template name="right" label="Right label" labelPosition="right" />
    </div>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Toggle can have different sizes by passing `size` prop.',
  },
}
Sizes.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Template name="small" size="small" label="Small size" />
      <Template name="large" size="large" label="Large size" />
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: "You can't toggle me",
  name: 'disabled',
}

export const Tooltip = Template.bind({})
Tooltip.args = {
  name: 'tooltip',
  tooltip: 'Hello there!',
}
