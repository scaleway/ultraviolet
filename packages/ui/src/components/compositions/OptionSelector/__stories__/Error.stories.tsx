import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Stack } from '../../../Stack'
import { OptionSelector } from '..'
import type { ValueType } from '../__mock__/resources'
import {
  firstSelectorOptions,
  franceOptions,
  netherlandsOptions,
  polandOptions,
} from '../__mock__/resources'
import type { SelectorOption } from '../types'

export const Error: StoryFn<ComponentProps<typeof OptionSelector>> = props => {
  const [zone, setZone] = useState<SelectorOption[]>(franceOptions)
  const [valueFirstExample, setValueFirstExample] = useState<ValueType>({
    first: 'fr',
    second: '',
  })

  const [zone2, setZone2] = useState<SelectorOption[]>(franceOptions)
  const [valueSecondExample, setValueSecondExample] = useState<ValueType>({
    first: 'fr',
    second: '',
  })

  const onChangeErrorRegion = (newValue: ValueType) => {
    setValueFirstExample(newValue)
    if (newValue.first === 'fr') {
      setZone(franceOptions)
    }
    if (newValue.first === 'pl') {
      setValueSecondExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZone(polandOptions)
    }

    if (newValue.first === 'nl') {
      setValueSecondExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZone(netherlandsOptions)
    }
  }
  const onChangeErrorZone = (newValue: ValueType) => {
    setValueSecondExample(newValue)
    if (newValue.first === 'fr') {
      setZone2(franceOptions)
    }
    if (newValue.first === 'pl') {
      setZone2(polandOptions)
    }
    if (newValue.first === 'nl') {
      setZone2(netherlandsOptions)
    }
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
          options: firstSelectorOptions,
        }}
        onChange={onChangeErrorRegion}
        secondSelector={{
          helper:
            valueFirstExample.second === 'fr'
              ? 'Disabled because the first selector has an error'
              : '',
          label: 'Zone',
          options: zone,
        }}
        value={valueFirstExample}
      />
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        onChange={onChangeErrorZone}
        secondSelector={{
          error:
            valueSecondExample.second === zone2[0].value
              ? 'Cannot select this zone'
              : '',
          label: 'Zone',
          options: zone2,
        }}
        value={valueSecondExample}
      />
    </Stack>
  )
}
