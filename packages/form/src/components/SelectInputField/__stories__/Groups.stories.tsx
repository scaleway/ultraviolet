import type { Story } from '@storybook/react'
import type { SelectInputFieldProps } from '..'
import { SelectInputField } from '..'

export const Groups: Story<SelectInputFieldProps> = () => (
  <SelectInputField
    name="options"
    options={[
      {
        label: 'option1',
        options: [
          {
            label: 'AA',
            value: 'AA',
          },
          {
            label: 'AB',
            value: 'AB',
          },
          {
            label: 'AC',
            value: 'AC',
          },
        ],
      },
      {
        label: 'option2',
        options: [
          {
            label: 'BA',
            value: 'BA',
          },
          {
            label: 'BB',
            value: 'BB',
          },
          {
            label: 'BC',
            value: 'BC',
          },
        ],
      },
    ]}
  />
)
