import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
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

export const DefaultValue: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [value, setValue] = useState('fr')
  const [value2, setValue2] = useState(zone[0].value)

  const [zone2, setZone2] = useState<SelectorOption[]>(franceOptions)
  const [zone3, setZone3] = useState<SelectorOption[]>(franceOptions)
  const [value21, setValue21] = useState('fr')
  const [value22, setValue22] = useState('')
  const [value31, setValue31] = useState('')
  const [value32, setValue32] = useState(zone3[0].value)

  const onChangeRegion = (newRegion: string) => {
    setValue(newRegion)
    if (newRegion === 'fr') {
      setValue2(franceOptions[0].value)
      setZone(franceOptions)
    }
    if (newRegion === 'pl') {
      setValue2(polandOptions[0].value)
      setZone(polandOptions)
    }

    if (newRegion === 'nl') {
      setValue2(netherlandsOptions[0].value)
      setZone(netherlandsOptions)
    }
  }
  const onChangeRegion2 = (newRegion: string) => {
    setValue21(newRegion)
    if (newRegion === 'fr') {
      setZone2(franceOptions)
    }
    if (newRegion === 'pl') {
      setZone2(polandOptions)
    }
    if (newRegion === 'nl') {
      setZone2(netherlandsOptions)
    }
  }

  const onChangeRegion3 = (newRegion: string) => {
    setValue31(newRegion)
    if (newRegion === 'fr') {
      setZone3(franceOptions)
      setValue32(franceOptions[0].value)
    }
    if (newRegion === 'pl') {
      setZone3(polandOptions)
      setValue32(polandOptions[0].value)
    }
    if (newRegion === 'nl') {
      setValue32(netherlandsOptions[0].value)
      setZone3(netherlandsOptions)
    }
  }

  const onChangeZone = (newZone: string) => {
    setValue2(newZone)
  }
  const onChangeZone2 = (newZone: string) => {
    setValue22(newZone)
  }
  const onChangeZone3 = (newZone: string) => {
    setValue32(newZone)
  }

  return (
    <Stack direction="column" gap={2}>
      Default values for both:
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
      Default value for the first one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion2,
          options: firstSelectorOptions,
          value: value21,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeZone2,
          options: zone2,
          value: value22,
        }}
      />
      Default value for the second one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion3,
          options: firstSelectorOptions,
          value: value31,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeZone3,
          options: zone3,
          value: value32,
        }}
      />
    </Stack>
  )
}
