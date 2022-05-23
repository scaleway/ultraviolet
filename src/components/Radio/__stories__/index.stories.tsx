import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Radio from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  args: {
    checked: false,
    children: 'Label 1',
    disabled: false,
    name: 'basic',
    value: 'label-1',
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
    <ControlValue value="label-1">
      {({ value, onChange }) => (
        <>
          <Radio
            name="label-1"
            checked={value === 'label-1'}
            value="label-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
          >
            Label 1
          </Radio>
          <Radio
            name="label-2"
            checked={value === 'label-2'}
            value="label-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
          >
            Label 2
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
