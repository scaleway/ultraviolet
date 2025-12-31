import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
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

export const Error: StoryFn<ComponentProps<typeof OptionSelector>> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [valueFirstExample, setValueFirstExample] = useState({
    first: 'fr',
    second: '',
  })

  const [zone2, setZone2] = useState<SelectorOption[]>(franceOptions)
  const [valueSecondExample, setValueSecondExample] = useState({
    first: 'fr',
    second: '',
  })

  const onChangeRegion = (newRegion: string) => {
    setValueFirstExample(oldValue => ({
      first: newRegion,
      second: oldValue.second,
    }))
    if (newRegion === 'fr') {
      setZone(franceOptions)
    }
    if (newRegion === 'pl') {
      setValueSecondExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZone(polandOptions)
    }

    if (newRegion === 'nl') {
      setValueSecondExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZone(netherlandsOptions)
    }
  }
  const onChangeRegion2 = (newRegion: string) => {
    setValueSecondExample(oldValue => ({
      first: newRegion,
      second: oldValue.second,
    }))
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
    setValueFirstExample(oldValue => ({
      first: oldValue.first,
      second: newZone,
    }))
  }
  const onChangeZone2 = (newZone: string) => {
    setValueSecondExample(oldValue => ({
      first: oldValue.first,
      second: newZone,
    }))
  }

  return (
    <Stack direction="column" gap={2}>
      <OptionSelector
        {...props}
        firstSelector={{
          error:
            valueFirstExample.first === 'fr'
              ? 'France cannot be selected'
              : false,
          label: 'Region',
          onChange: onChangeRegion,
          options: firstSelectorOptions,
          value: valueFirstExample.first,
        }}
        secondSelector={{
          helper:
            valueFirstExample.second === 'fr'
              ? 'Disabled because the first selector has an error'
              : '',
          label: 'Zone',
          onChange: onChangeZone,
          options: zone,
          value: valueFirstExample.second,
        }}
      />
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion2,
          options: firstSelectorOptions,
          value: valueSecondExample.first,
        }}
        secondSelector={{
          error:
            valueSecondExample.second === zone2[0].value
              ? 'Cannot select this zone'
              : '',
          label: 'Zone',
          onChange: onChangeZone2,
          options: zone2,
          value: valueSecondExample.second,
        }}
      />
    </Stack>
  )
}
