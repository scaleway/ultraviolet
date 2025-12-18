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

export const Playground: StoryFn<
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
        options: firstSelectorOptions,
        value,
      }}
      secondSelector={{
        label: 'Zone',
        onChange: onChangeZone,
        options: zone,
        value: value2,
      }}
    />
  )
}
