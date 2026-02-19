import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OptionSelector } from '..'
import type { ValueType } from '../__mock__/resources'
import {
  firstSelectorOptions,
  franceOptions,
  netherlandsOptions,
  polandOptions,
} from '../__mock__/resources'
import type { SelectorOption } from '../types'

export const Direction: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [value, setValue] = useState<{ first?: string; second?: string }>({
    first: '',
    second: '',
  })

  const onChange = (newValue: ValueType) => {
    setValue(newValue)
    if (newValue.first === 'fr') {
      setZone(franceOptions)
    }
    if (newValue.first === 'pl') {
      setZone(polandOptions)
    }
    if (newValue.first === 'nl') {
      setZone(netherlandsOptions)
    }
  }

  return (
    <OptionSelector
      {...props}
      firstSelector={{
        label: 'Region',
        options: firstSelectorOptions,
      }}
      onChange={onChange}
      secondSelector={{
        label: 'Zone',
        options: zone,
        tooltip: value.first ? undefined : 'Select a region first',
      }}
      value={value}
    />
  )
}

Direction.parameters = {
  docs: {
    description: {
      story:
        'By default the component has a horizontal direction, but it can be changed to be `vertical`',
    },
  },
}
Direction.args = {
  direction: 'vertical',
}
