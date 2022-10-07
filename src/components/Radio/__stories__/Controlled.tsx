import { Story } from '@storybook/react'
import { useState } from 'react'
import Radio from '..'

const codeSnippet = `
const [value, onChange] = useState('label-1')

return (
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
)
`

export const Controlled: Story = () => {
  const [value, onChange] = useState('label-1')

  return (
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
  )
}
Controlled.parameters = {
  docs: {
    storyDescription:
      'Radio only work as a controlled component. You need to pass `onChange` callback to control it.',
    source: {
      code: codeSnippet,
    },
  },
}
