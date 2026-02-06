'use client'

import { memo, useMemo } from 'react'
import { UnitInput } from '../../../UnitInput'
import { useEstimateCost } from '../EstimateCostProvider'
import type { Iteration, Units } from '../types'

type CustomUnitInputProps = {
  defaultTimeUnit?: Units
  setIteration: (iteration: Iteration) => void
  iteration: Iteration
  timeUnits: Units[]
}

export const CustomUnitInput = memo(
  ({
    defaultTimeUnit = 'hours',
    setIteration,
    iteration,
    timeUnits,
  }: CustomUnitInputProps) => {
    const { locales } = useEstimateCost()

    const options = useMemo(
      () =>
        timeUnits.map(unit => ({
          label: locales[`estimate.cost.units.${unit}.label`],
          value: unit,
        })),
      [timeUnits, locales],
    )

    const defaultOption = useMemo(
      () => options.find(({ value }) => value === defaultTimeUnit),
      [defaultTimeUnit, options],
    )

    return (
      <UnitInput
        min={1}
        name="iteration"
        onChange={inputValue =>
          setIteration({
            unit: iteration.unit,
            value: inputValue,
          })
        }
        onChangeUnitValue={unitValue => {
          setIteration({
            unit: unitValue as Units,
            value: iteration.value,
          })
        }}
        options={options}
        placeholder="0"
        selectInputWidth="100%"
        size="medium"
        templateColumns="auto auto"
        unitValue={iteration.unit || defaultOption?.value}
        value={iteration.value}
        width="100%"
      />
    )
  },
)
