import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectInput } from '..'
import { Stack } from '../../../Layout/Stack'
import type { OptionType } from '../types'
import { dataGrouped, dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const AddOption: StoryFn<typeof SelectInput> = args => {
  const [addOptionDataUngrouped, setAddOptionDataUngrouped] = useState(dataUnGrouped)
  const [valueUngrouped, setValueUngrouped] = useState('')
  const onClickUngrouped = (text: string) => {
    setAddOptionDataUngrouped(oldData => [{ label: text, value: text }, ...oldData])
    setValueUngrouped(text)
  }
  const onChangeUngrouped = (value: string) => {
    if (dataUnGrouped.some(data => data.value === value)) {
      setAddOptionDataUngrouped(dataUnGrouped)
      setValueUngrouped(value)
    }
  }

  const [addOptionDataGrouped, setAddOptionDataGrouped] = useState<Record<string, OptionType[]>>(dataGrouped)
  const [valueGrouped, setValueGrouped] = useState('')
  const onClickGrouped = (text: string) => {
    const groupUserCreated =
      '' in addOptionDataGrouped
        ? {
            '': [...addOptionDataGrouped[''], { label: text, value: text }],
          }
        : { '': [{ label: text, value: text }] }

    setAddOptionDataGrouped(oldData => ({
      ...groupUserCreated,
      ...oldData,
    }))
    setValueGrouped(text)
  }
  const onChangeGrouped = (value: string) => {
    if (
      '' in addOptionDataGrouped &&
      !(addOptionDataGrouped[''] as { value: string }[]).some((data: { value: string }) => data.value === value)
    ) {
      setAddOptionDataGrouped(dataGrouped)
      setValueGrouped(value)
    }
  }

  const [addOptionDataMulti, setAddOptionDataMulti] = useState(dataUnGrouped)
  const [valueMulti, setValueMulti] = useState<string[]>([])
  const onClickMulti = (text: string) => {
    setAddOptionDataMulti(oldData => [{ label: text, value: text }, ...oldData])
    setValueMulti(oldValue => [...oldValue])
  }
  const onChangeMulti = (value: string[]) => {
    const newDataMulti = addOptionDataMulti.filter(
      data => value.includes(data.value) || dataUnGrouped.some(val => val.value === data.value),
    )

    setAddOptionDataMulti(newDataMulti)
    setValueMulti(value)
  }

  return (
    <Stack direction="column" gap={2} width="50%">
      <SelectInput
        addOption={{ onClick: onClickUngrouped, text: 'Create' }}
        accessibleLabel="Search for a new value (ungrouped data)"
        onChange={onChangeUngrouped}
        options={addOptionDataUngrouped}
        placeholderSearch="Search or enter a value"
        value={valueUngrouped}
      />
      <SelectInput
        {...args}
        addOption={{ onClick: onClickGrouped, text: 'Add' }}
        label="Search for a new value (grouped data)"
        onChange={onChangeGrouped}
        options={addOptionDataGrouped}
        placeholderSearch="Search or enter a value"
        value={valueGrouped}
      />
      <SelectInput
        addOption={{ onClick: onClickMulti, text: 'Select' }}
        label="Search for a new value (multiselect)"
        multiselect
        onChange={onChangeMulti}
        options={addOptionDataMulti}
        placeholderSearch="Search or enter a value"
        value={valueMulti}
      />
    </Stack>
  )
}
AddOption.args = {
  ...Template.args,
  options: {},
}

AddOption.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

AddOption.parameters = {
  docs: {
    description: {
      story:
        'When `searchable`, use prop `addOption` to allow users to input a value that is not present in the predefined list of options. When a addOption is set, the search bar will be displayed even if there are less than 6 possible options. The component does not automatically create the new option, it must be controlled. See the story code for an example.',
    },
  },
}
