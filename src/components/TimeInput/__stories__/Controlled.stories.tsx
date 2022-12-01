import { Story } from '@storybook/react'
import TimeInput from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import { SelectOption } from '../../RichSelect'

export const Controlled: Story = () => (
  <ControlValue<SelectOption> value={{ label: '03:30', value: '03:30' }}>
      {({ value, onChange }) => (
        <TimeInput
          name="timeinput-test-controlled"
          onChange={onChange}
          placeholder="Time"
          value={value}
        />
      )}
    </ControlValue>
)

Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html).',
  },
}
