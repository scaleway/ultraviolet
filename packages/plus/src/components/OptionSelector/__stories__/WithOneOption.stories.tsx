import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { OptionSelector } from '../OptionSelector'
import type { SelectorOption } from '../types'
import {
  firstSelectorOptions,
  franceOptions,
  netherlandsOptions,
  polandOptions,
} from './resources'

export const OneOption: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const onChangeRegion = (newRegion: string) => {
    setValue(newRegion)
    if (newRegion === 'fr') {
      setZone(franceOptions)
    }
    if (newRegion === 'pl') {
      setZone(polandOptions)
    }
    if (newRegion === 'nl') {
      setZone(netherlandsOptions)
    }
  }

  const onChangeZone = (newZone: string) => {
    setValue2(newZone)
  }

  return (
    <OptionSelector
      {...props}
      firstSelector={{
        label: 'Region',
        onChange: onChangeRegion,
        options: [firstSelectorOptions[0]],
        value,
      }}
      secondSelector={{
        helper: 'Only one zone is available',
        label: 'Zone',
        onChange: onChangeZone,
        options: [zone[0]],
        value: value2,
      }}
    />
  )
}
