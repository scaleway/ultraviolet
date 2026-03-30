import { useState } from 'react'

import { PhoneInput } from '..'
import { parsePhoneValue } from '../helpers'

import type { StoryFn } from '@storybook/react-vite'

export const WithUserControlledFormatting: StoryFn<typeof PhoneInput> = () => {
  const [value, setValue] = useState<string>('')
  const [parsedData, setParsedData] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)

    const parsed = parsePhoneValue(inputValue, 'FR')
    setParsedData(JSON.stringify(parsed, null, 2))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PhoneInput
        defaultCountry="FR"
        disableAutoFormat
        label="Phone Number (Manual Format)"
        name="phone-manual"
        onChange={handleChange}
        placeholder="Enter phone number"
        value={value}
      />
      <pre
        style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto',
        }}
      >
        {parsedData || 'Start typing to see parsed data...'}
      </pre>
    </div>
  )
}

export const WithOnValueChange: StoryFn<typeof PhoneInput> = () => {
  const [value, setValue] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PhoneInput
        defaultCountry="FR"
        label="Phone Number (with metadata)"
        name="phone-metadata"
        onValueChange={data => {
          setMetadata(JSON.stringify(data, null, 2))
        }}
        onChange={event => setValue(event.target.value)}
        placeholder="Enter phone number"
        value={value}
      />
      <pre
        style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto',
        }}
      >
        {metadata || 'Start typing to see metadata...'}
      </pre>
    </div>
  )
}

export const WithExternalValidation: StoryFn<typeof PhoneInput> = () => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)

    const parsed = parsePhoneValue(inputValue, 'FR')
    if (inputValue.length > 0 && !parsed.valid) {
      setError('Invalid phone number format')
    } else {
      setError('')
    }
  }

  return (
    <PhoneInput
      defaultCountry="FR"
      disableAutoFormat
      error={error}
      label="Phone Number (External Validation)"
      name="phone-validation"
      onChange={handleChange}
      placeholder="Enter phone number"
      value={value}
    />
  )
}
