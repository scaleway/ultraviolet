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

export const DefaultValue: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zoneFirstExample, setZoneFirstExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueFirstExample, setValueFirstExample] = useState({
    first: 'fr',
    second: zoneFirstExample[0].value,
  })

  const [zoneSecondExample, setZoneSecondExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueSecondExample, setValueSecondExample] = useState({
    first: 'fr',
    second: '',
  })

  const [zoneThirdExample, setZoneThirdExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueThirdExample, setValueThirdExample] = useState({
    first: '',
    second: zoneThirdExample[0].value,
  })

  const onChangeRegion = (newRegion: string) => {
    setValueFirstExample(oldValue => ({
      first: newRegion,
      second: oldValue.second,
    }))
    if (newRegion === 'fr') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: franceOptions[0].value,
      }))
      setZoneFirstExample(franceOptions)
    }
    if (newRegion === 'pl') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZoneFirstExample(polandOptions)
    }

    if (newRegion === 'nl') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZoneFirstExample(netherlandsOptions)
    }
  }
  const onChangeRegion2 = (newRegion: string) => {
    setValueSecondExample(oldValue => ({
      first: newRegion,
      second: oldValue.second,
    }))
    if (newRegion === 'fr') {
      setZoneSecondExample(franceOptions)
    }
    if (newRegion === 'pl') {
      setZoneSecondExample(polandOptions)
    }
    if (newRegion === 'nl') {
      setZoneSecondExample(netherlandsOptions)
    }
  }

  const onChangeRegion3 = (newRegion: string) => {
    setValueThirdExample(oldValue => ({
      first: newRegion,
      second: oldValue.second,
    }))
    if (newRegion === 'fr') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: franceOptions[0].value,
      }))
      setZoneThirdExample(franceOptions)
    }
    if (newRegion === 'pl') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZoneThirdExample(polandOptions)
    }
    if (newRegion === 'nl') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZoneThirdExample(netherlandsOptions)
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
  const onChangeZone3 = (newZone: string) => {
    setValueThirdExample(oldValue => ({
      first: oldValue.first,
      second: newZone,
    }))
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
          value: valueFirstExample.first,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeZone,
          options: zoneFirstExample,
          value: valueFirstExample.second,
        }}
      />
      Default value for the first one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion2,
          options: firstSelectorOptions,
          value: valueSecondExample.first,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeZone2,
          options: zoneSecondExample,
          value: valueSecondExample.second,
        }}
      />
      Default value for the second one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          onChange: onChangeRegion3,
          options: firstSelectorOptions,
          value: valueThirdExample.first,
        }}
        secondSelector={{
          label: 'Zone',
          onChange: onChangeZone3,
          options: zoneThirdExample,
          value: valueThirdExample.second,
        }}
      />
    </Stack>
  )
}
