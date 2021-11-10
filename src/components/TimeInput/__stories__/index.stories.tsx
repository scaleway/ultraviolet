import { Meta, Story } from '@storybook/react'
import React from 'react'
import TimeInput, { TimeInputProps } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  component: TimeInput,
  parameters: {
    docs: {
      description: {
        component: 'A simple input to choose a time in a list.',
      },
    },
  },
  title: 'Components/Data Entry/TimeInput',
} as Meta

const Template: Story<TimeInputProps> = args => (
  <div style={{ height: '300px' }}>
    <TimeInput
      name="timeinput-test-basic"
      placeholder="Time"
      value={{ label: '03:30', value: '03:30' }}
      {...args}
    />
  </div>
)

export const Default = Template.bind({})

export const Uncontrolled = Template.bind({})
Uncontrolled.parameters = {
  docs: {
    storyDescription:
      'TimeInput can be used as an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html).',
  },
}
Uncontrolled.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <TimeInput
          name="timeinput-test-0"
          placeholder="Time"
          value={{ label: '03:30', value: '03:30' }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TimeInput name="timeinput-test-1" placeholder="Time" disabled />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TimeInput name="timeinput-test-2" placeholder="Time" required />
      </div>
      <div style={{ height: '300px' }}>
        <TimeInput name="timeinput-test-3" placeholder="Time" error />
      </div>
    </>
  ),
]

export const Controlled = Template.bind({})
Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html).',
  },
}
Controlled.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={{ label: '03:30', value: '03:30' }} mb={2}>
          {({ value, onChange }) => (
            <TimeInput
              name="timeinput-test-4"
              onChange={onChange}
              placeholder="Time"
              value={value}
            />
          )}
        </ControlValue>
      </div>
      <div style={{ height: '300px' }}>
        <ControlValue value={{ label: '04:30', value: '04:30' }} mb={2}>
          {({ value, onChange }) => (
            <TimeInput
              name="timeinput-test-5"
              onChange={onChange}
              placeholder="Time"
              value={value}
            />
          )}
        </ControlValue>
      </div>
    </>
  ),
]

export const Schedule = Template.bind({})
Schedule.parameters = {
  docs: {
    storyDescription:
      'You can adjust the time between options with the `schedule` props. `hours`, `half` and `quarter` are available. By default, the `hours` option is selected.',
  },
}
Schedule.decorators = [
  () => (
    <>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={{ label: '10:15', value: '10:15' }}>
          {({ value, onChange }) => (
            <TimeInput
              name="timeinput-test-6"
              placeholder="Time"
              value={value}
              onChange={onChange}
              schedule="quarter"
            />
          )}
        </ControlValue>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <ControlValue value={{ label: '10:30', value: '10:30' }}>
          {({ value, onChange }) => (
            <TimeInput
              name="timeinput-test-7"
              placeholder="Time"
              value={value}
              onChange={onChange}
              schedule="half"
            />
          )}
        </ControlValue>
      </div>
      <div style={{ height: '300px' }}>
        <ControlValue value={{ label: '10:00', value: '10:00' }}>
          {({ value, onChange }) => (
            <TimeInput
              name="timeinput-test-8"
              placeholder="Time"
              value={value}
              onChange={onChange}
            />
          )}
        </ControlValue>
      </div>
    </>
  ),
]
