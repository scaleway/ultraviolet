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

export const HideSecondSelector: StoryFn<
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
      }}
      value={value}
    />
  )
}

HideSecondSelector.parameters = {
  docs: {
    description: {
      story:
        'When set to `hideWhenEmpty` is set to true, the second selector is visible only when the first selector has a selected value.',
    },
  },
}

HideSecondSelector.args = {
  hideWhenEmpty: true,
}
