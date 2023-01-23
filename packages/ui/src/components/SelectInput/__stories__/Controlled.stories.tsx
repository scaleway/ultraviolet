import type { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import type { SingleValue } from 'react-select'
import { SelectInput } from '..'

type OptionType = { label: string; value: string }

export const Controlled: ComponentStory<typeof SelectInput> = ({
  ...props
}) => {
  const [value, setValue] = useState<OptionType>()

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setValue(newValue)
    }
  }

  return (
    <SelectInput
      name="controlled"
      value={value}
      // @ts-expect-error onChange signature error because SelectInput did not properly implement IsMulti
      onChange={handleChange}
      {...props}
    >
      <SelectInput.Option value="a">Option A</SelectInput.Option>
      <SelectInput.Option value="b">Option B</SelectInput.Option>
    </SelectInput>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription: 'This shows how to use Controlled SelectInput.',
  },
}
