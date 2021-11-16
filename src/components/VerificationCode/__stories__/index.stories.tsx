import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import VerificationCode, { VerificationCodeProps } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  component: VerificationCode,
  title: 'Components/Data Entry/VerificationCode',
} as Meta

const Template: Story<VerificationCodeProps> = args => (
  <VerificationCode inputId="verification-code-input" {...args} />
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: `A Small component to enter some text or numbers one by one.`,
    },
  },
}

export const InitialValue = Template.bind({})
InitialValue.args = { initialValue: '1337' }

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: '0000' }

export const Error = Template.bind({})
Error.args = { error: true }

export const Type = Template.bind({})
Type.args = { type: 'text' }

export const Incomplete = Template.bind({})
Incomplete.args = { fields: 6, initialValue: '13', placeholder: '0037' }

type OnChangeType = (data: unknown) => void

export const Controlled: Story = () => (
  <ControlValue value="">
    {({ value, onChange }) => (
      <>
        <VerificationCode
          onChange={onChange as OnChangeType}
          placeholder="0000"
          inputId="verification-code-input-controlled"
        />
        Value is : {value}
      </>
    )}
  </ControlValue>
)

export const OnComplete: Story = () => {
  const [displayComplete, setDisplayComplete] = useState(false)

  return (
    <>
      <VerificationCode
        placeholder="0000"
        inputId="verification-code-input-completed-action"
        onChange={() => {
          if (displayComplete) setDisplayComplete(false)
        }}
        onComplete={() => {
          setDisplayComplete(true)
        }}
      />
      {displayComplete && 'Completed !'}
    </>
  )
}
