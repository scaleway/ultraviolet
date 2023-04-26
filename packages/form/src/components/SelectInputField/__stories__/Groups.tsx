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
            label: '1-A',
            value: '1-A',
          },
          {
            label: '1-B',
            value: '1-B',
          },
          {
            label: '1-B',
            value: '1-B',
          },
        ],
      },
      {
        label: 'option2',
        options: [
          {
            label: '2-A',
            value: '2-A',
          },
          {
            label: '2-B',
            value: '2-B',
          },
          {
            label: '2-B',
            value: '2-B',
          },
        ],
      },
    ]}
  />
)
