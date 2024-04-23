import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'
import { OptionalInfo4, dataGrouped } from './resources'

export const OnChange: StoryFn<typeof SelectInputV2> = args => {
  const [values, setValues] = useState<(string | undefined)[]>([])

  const defaultOptions = [
    {
      label: 'Create a new city',
      value: 'new city',
      disabled: false,
    },
    ...OptionalInfo4,
  ]
  const [options, setOptions] = useState(defaultOptions)

  const onChange = (vals: (string | undefined)[]) => {
    if (vals.includes('new city')) {
      const newOptions = options.map(option => {
        const newOption = option
        if (option.value !== 'new city') {
          newOption.disabled = true
        }

        return newOption
      })

      setOptions(newOptions)
    } else {
      const newOptions = options.map(option => {
        const newOption = option
        if (option.value !== 'new city') {
          newOption.disabled = false
        }

        return newOption
      })

      setOptions(newOptions)
    }
  }

  return (
    <>
      <Stack direction="row" gap={4}>
        <SelectInputV2
          {...args}
          onChange={setValues}
          options={dataGrouped}
          label="Simple onChange to get the selected value"
          selectAll={{
            label: 'Select All',
            description: 'You can click here to select every option',
          }}
        />
        Selected values:
        <ul>
          {values.length > 0
            ? values.map(val => <li key={val}>{val}</li>)
            : null}
        </ul>
      </Stack>
      <SelectInputV2
        {...args}
        options={options}
        onChange={onChange}
        searchable={false}
        label="More complex onChange, to update the state of some options"
      />
    </>
  )
}

OnChange.args = {
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
  multiselect: true,
}

OnChange.parameters = {
  docs: {
    description: {
      story:
        'You can pass a function to `OnChange` to deal with selection of options.',
    },
  },
}
