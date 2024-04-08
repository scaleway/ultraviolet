import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectInputV2 } from '..'
import { dataGrouped } from './resources'

export const OnChange: StoryFn<typeof SelectInputV2> = args => {
  const [values, setValues] = useState<(string | undefined)[]>([''])

  return (
    <>
      <SelectInputV2 {...args} onChange={setValues} />
      Selected values:
      {values.length > 0 ? values.map(val => <div key={val}>{val}</div>) : null}
    </>
  )
}

OnChange.args = {
  name: 'example',
  label: 'Label',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
  width: 400,
  options: dataGrouped,
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
