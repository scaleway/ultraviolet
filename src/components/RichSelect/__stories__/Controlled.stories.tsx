import { ComponentStory } from '@storybook/react'
import { ChangeEvent, useState } from 'react'
import RichSelect from '..'

export const Controlled: ComponentStory<typeof RichSelect> = ({ ...props }) => {
  const [value, setValue] = useState<string>('a')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
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
