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

export const Error: StoryFn<ComponentProps<typeof OptionSelector>> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [value, setValue] = useState('fr')
  const [value2, setValue2] = useState('')

  const [zone2, setZone2] = useState<SelectorOption[]>(franceOptions)
  const [value21, setValue21] = useState('fr')
  const [value22, setValue22] = useState('')

  const onChangeRegion = (newRegion: string) => {
    setValue(newRegion)
    if (newRegion === 'fr') {
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

  const onChangeZone = (newZone: string) => {
    setValue2(newZone)
  }
  const onChangeZone2 = (newZone: string) => {
    setValue22(newZone)
  }

  return (
    <Stack direction="column" gap={2}>
      <OptionSelector
        {...props}
        firstSelector={{
          error: value === 'fr' ? 'France cannot be selected' : false,
          label: 'Region',
          onChange: onChangeRegion,
          options: firstSelectorOptions,
          value,
        }}
        secondSelector={{
          helper:
            value === 'fr'
              ? 'Disabled because the first selector has an error'
              : '',
          label: 'Zone',
          onChange: onChangeZone,
          options: zone,
          value: value2,
        }}
      />
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion2,
          options: firstSelectorOptions,
          value: value21,
        }}
        secondSelector={{
          error: value22 === zone2[0].value ? 'Cannot select this zone' : '',
          label: 'Zone',
          onChange: onChangeZone2,
          options: zone2,
          value: value22,
        }}
      />
    </Stack>
  )
}
