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

export const DefaultValue: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => {
  const [zoneFirstExample, setZoneFirstExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueFirstExample, setValueFirstExample] = useState<ValueType>({
    first: 'fr',
    second: zoneFirstExample[0].value,
  })

  const [zoneSecondExample, setZoneSecondExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueSecondExample, setValueSecondExample] = useState<ValueType>({
    first: 'fr',
    second: '',
  })

  const [zoneThirdExample, setZoneThirdExample] =
    useState<SelectorOption[]>(franceOptions)
  const [valueThirdExample, setValueThirdExample] = useState<ValueType>({
    first: '',
    second: zoneThirdExample[0].value,
  })

  const onChangeFirstExample = (newValue: ValueType) => {
    setValueFirstExample(newValue)
    if (newValue.first === 'fr') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: franceOptions[0].value,
      }))
      setZoneFirstExample(franceOptions)
    }
    if (newValue.first === 'pl') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZoneFirstExample(polandOptions)
    }

    if (newValue.first === 'nl') {
      setValueFirstExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZoneFirstExample(netherlandsOptions)
    }
  }
  const onChangeSecondExample = (newValue: ValueType) => {
    setValueSecondExample(newValue)
    if (newValue.first === 'fr') {
      setZoneSecondExample(franceOptions)
    }
    if (newValue.first === 'pl') {
      setZoneSecondExample(polandOptions)
    }
    if (newValue.first === 'nl') {
      setZoneSecondExample(netherlandsOptions)
    }
  }

  const onChangeThirdExample = (newValue: ValueType) => {
    setValueThirdExample(newValue)
    if (newValue.first === 'fr') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: franceOptions[0].value,
      }))
      setZoneThirdExample(franceOptions)
    }
    if (newValue.first === 'pl') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: polandOptions[0].value,
      }))
      setZoneThirdExample(polandOptions)
    }
    if (newValue.first === 'nl') {
      setValueThirdExample(oldValue => ({
        first: oldValue.first,
        second: netherlandsOptions[0].value,
      }))
      setZoneThirdExample(netherlandsOptions)
    }
  }

  return (
    <Stack direction="column" gap={2}>
      Default values for both:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        onChange={onChangeFirstExample}
        secondSelector={{
          label: 'Zone',
          options: zoneFirstExample,
        }}
        value={valueFirstExample}
      />
      Default value for the first one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        onChange={onChangeSecondExample}
        secondSelector={{
          label: 'Zone',
          options: zoneSecondExample,
        }}
        value={valueSecondExample}
      />
      Default value for the second one only:
      <OptionSelector
        {...props}
        firstSelector={{
          label: 'Region',
          options: firstSelectorOptions,
        }}
        onChange={onChangeThirdExample}
        secondSelector={{
          label: 'Zone',
          options: zoneThirdExample,
        }}
        value={valueThirdExample}
      />
    </Stack>
  )
}
