import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectInput } from '..'
import { Stack } from '../../Stack'
import { OptionalInfo4, dataGrouped } from './resources'

export const OnChange: StoryFn<typeof SelectInput> = args => {
  const [values, setValues] = useState<string[]>([])
  const [values2, setValues2] = useState<
    (typeof OptionalInfo4)[number]['value'][]
  >(['par'])
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
      setValues2(['new city'])
    } else {
      const newOptions = options.map(option => {
        const newOption = option
        if (option.value !== 'new city') {
          newOption.disabled = false
        }

        return newOption
      })

      setOptions(newOptions)
      if (vals.length > 0) {
        setValues2(vals.filter(value => typeof value === 'string'))
      } else setValues2([])
    }
  }

  return (
    <>
      <Stack direction="row" gap={4}>
        <SelectInput
          {...args}
          multiselect
          value={values}
          onChange={setValues}
          options={dataGrouped}
          label="Simple onChange to get the selected value"
        />
        Selected values:
        <ul>
          {values.length > 0
            ? values.map(val => <li key={val}>{val}</li>)
            : null}
        </ul>
      </Stack>
      <SelectInput
        {...args}
        value={values2}
        multiselect
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
