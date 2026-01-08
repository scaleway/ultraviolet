import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped, dataUnGrouped } from './resources'
import { Template } from './Template.stories'

export const AddOption: StoryFn<typeof SelectInput> = args => {
  const [addOptionDataUngrouped, setDataUngrouped] = useState(dataUnGrouped)
  const [valueUngrouped, setValueUngrouped] = useState('')
  const onClickUngrouped = (text: string) => {
    setDataUngrouped(oldData => [{ label: text, value: text }, ...oldData])
    setValueUngrouped(text)
  }
  const onChangeUngrouped = (value: string) => {
    if (dataUnGrouped.some(data => data.value === value)) {
      setDataUngrouped(dataUnGrouped)
      setValueUngrouped(value)
    }
  }

  const [addOptionDataGrouped, setDataGrouped] = useState(dataGrouped)
  const [valueGrouped, setValueGrouped] = useState('')
  const onClickGrouped = (text: string) => {
    const groupUserCreated =
      '' in addOptionDataGrouped
        ? {
            '': [
              ...(addOptionDataGrouped[''] as {
                label: string
                value: string
              }[]),
              { label: text, value: text },
            ],
          }
        : { '': [{ label: text, value: text }] }

    setDataGrouped(oldData => ({
      ...groupUserCreated,
      ...oldData,
    }))
    setValueGrouped(text)
  }
  const onChangeGrouped = (value: string) => {
    if (
      '' in addOptionDataGrouped &&
      !(addOptionDataGrouped[''] as { value: string }[]).some(
        (data: { value: string }) => data.value === value,
      )
    ) {
      setDataGrouped(dataGrouped)
      setValueGrouped(value)
    }
  }

  const [addOptionDataMulti, setDataMulti] = useState(dataUnGrouped)
  const [valueMulti, setValueMulti] = useState<string[]>([])
  const onClickMulti = (text: string) => {
    setDataMulti(oldData => [{ label: text, value: text }, ...oldData])
    setValueMulti(oldValue => [...oldValue])
  }
  const onChangeMulti = (value: string[]) => {
    const newDataMulti = addOptionDataMulti.filter(
      data =>
        value.includes(data.value) ||
        dataUnGrouped.some(val => val.value === data.value),
    )

    setDataMulti(newDataMulti)
    setValueMulti(value)
  }

  return (
    <Stack direction="column" gap={2} width="50%">
      <SelectInput
        {...args}
        addOption={{ onClick: onClickUngrouped, text: 'Create' }}
        label="Search for a new value (ungrouped data)"
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
  searchable: true,
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
