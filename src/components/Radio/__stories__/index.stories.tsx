import { Meta, Story } from '@storybook/react'
import React from 'react'
import Radio, { RadioProps } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
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

const Template: Story<RadioProps> = args => (
  <Radio name="basic" value="choice-1" checked {...args}>
    Choice 1
  </Radio>
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

export const Size = Template.bind({})
Size.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}
Size.decorators = [
  () => (
    <ControlValue value="big">
      {({ value, onChange }) => (
        <>
          <Radio
            name="radio-small"
            value="small"
            size={10}
            checked={value === 'small'}
            onChange={e => onChange(e.currentTarget.value)}
          >
            Small radio
          </Radio>
          <Radio
            name="radio-big"
            value="big"
            size={40}
            checked={value === 'big'}
            onChange={e => onChange(e.currentTarget.value)}
          >
            Big radio
          </Radio>
        </>
      )}
    </ControlValue>
  ),
]

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    storyDescription: 'Disable the input by using `disabled` prop',
  },
}
Disabled.decorators = [
  () => (
    <Radio value="disabled" name="radio-size" disabled>
      Disabled radio
    </Radio>
  ),
]
