import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import {
  firstSelectorOptions,
  franceOptions,
  netherlandsOptions,
  polandOptions,
} from '../__mock__/resources'
import { OptionSelector } from '../OptionSelector'
import type { SelectorOption } from '../types'

export const Playground: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [value, setValue] = useState({ first: '', second: '' })

  const onChangeRegion = (newRegion: string) => {
    setValue(oldValue => ({ first: newRegion, second: oldValue.second }))
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
    setValue(oldValue => ({ first: oldValue.first, second: newZone }))
  }

  return (
    <OptionSelector
      {...props}
      firstSelector={{
        label: 'Region',
        onChange: onChangeRegion,
        options: firstSelectorOptions,
        value: value.first,
      }}
      secondSelector={{
        label: 'Zone',
        onChange: onChangeZone,
        options: zone,
        value: value.second,
      }}
    />
  )
}
