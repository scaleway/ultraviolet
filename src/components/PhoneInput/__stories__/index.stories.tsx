import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import PhoneInput from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import Box from '../../Box'

export default {
  component: PhoneInput,
  decorators: [
    Children => (
      <Box height="220">
        <Children />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'An input specially made for phones with country flags and associated code.',
      },
    },
  },
  title: 'Components/Data Entry/PhoneInput',
} as Meta

const Template: Story<ComponentProps<typeof PhoneInput>> = args => (
  <PhoneInput {...args} />
)

export const Default = Template.bind({})

export const PrefilledIndicator = Template.bind({})
PrefilledIndicator.decorators = [
  () => (
    <ControlValue value="+33">
      {({ value, onChange }) => (
        <PhoneInput value={value} onChange={onChange} />
      )}
    </ControlValue>
  ),
]

export const PrefilledNumber = Template.bind({})
PrefilledNumber.decorators = [
  () => (
    <ControlValue value="+33607080910">
      {({ value, onChange }) => (
        <PhoneInput value={value} onChange={onChange} />
      )}
    </ControlValue>
  ),
]

export const Disabled = Template.bind({})
Disabled.decorators = [
  () => (
    <ControlValue value="+33607080910">
      {({ value, onChange }) => (
        <PhoneInput value={value} onChange={onChange} disabled />
      )}
    </ControlValue>
  ),
]

export const FlagDropdownDisabled = Template.bind({})
FlagDropdownDisabled.decorators = [
  () => (
    <ControlValue value="+33607080910">
      {({ value, onChange }) => (
        <PhoneInput value={value} onChange={onChange} disableDropdown />
      )}
    </ControlValue>
  ),
]
