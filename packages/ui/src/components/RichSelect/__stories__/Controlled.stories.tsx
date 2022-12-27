import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import type { SingleValue } from 'react-select'
import RichSelect from '..'

type OptionType = { label: string; value: string }

export const Controlled: ComponentStory<typeof RichSelect> = ({ ...props }) => {
  const [value, setValue] = useState<OptionType>()

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setValue(newValue)
    }
  }

  return (
    <RichSelect
      name="controlled"
      value={value}
      // @ts-expect-error onChange signature error because RichSelect did not properly implement IsMulti
      onChange={handleChange}
      {...props}
    >
      <RichSelect.Option value="a">Option A</RichSelect.Option>
      <RichSelect.Option value="b">Option B</RichSelect.Option>
    </RichSelect>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription: 'This shows how to use Controlled RichSelect.',
  },
}
