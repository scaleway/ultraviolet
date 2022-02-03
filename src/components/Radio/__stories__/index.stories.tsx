import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Radio from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  args: {
    checked: false,
    children: 'Choice 1',
    disabled: false,
    name: 'basic',
    value: 'choice-1',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'checked',
      name: 'checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean', required: false },
    },
  },
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'A radio button that only work as [controlled component](https://reactjs.org/docs/forms.html).',
      },
    },
  },
  title: 'Components/Data Entry/Radio',
} as Meta

const Template: Story<ComponentProps<typeof Radio>> = args => (
  <Radio {...args} />
)

export const Default = Template.bind({})

export const Controlled = Template.bind({})
Controlled.parameters = {
  docs: {
    storyDescription:
      'Radio only work as a controlled component. You need to pass `onChange` callback to control it.',
  },
}
Controlled.decorators = [
  () => (
    <ControlValue value="choice-1">
      {({ value, onChange }) => (
        <>
          <Radio
            name="choice-1"
            checked={value === 'choice-1'}
            value="choice-1"
            onChange={e => onChange(e.currentTarget.value)}
          >
            Choice 1
          </Radio>
          <Radio
            name="choice-2"
            checked={value === 'choice-2'}
            value="choice-2"
            onChange={e => onChange(e.currentTarget.value)}
          >
            Choice 2
          </Radio>
        </>
      )}
    </ControlValue>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value',
}

export const Valid = Template.bind({})
Valid.args = {
  checked: true,
  valid: true,
}
