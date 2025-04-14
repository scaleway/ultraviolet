'use client'

import { memo, useMemo } from 'react'
import { useEstimateCost } from '../EstimateCostProvider'
import type { Iteration, Units } from '../types'
import { UnitInput } from './UnitInput'

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
          value: unit,
          label: locales[`estimate.cost.units.${unit}.label`],
        })),
      [timeUnits, locales],
    )

    const defaultOption = useMemo(
      () => options.find(({ value }) => value === defaultTimeUnit),
      [defaultTimeUnit, options],
    )

    return (
      <UnitInput
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
        placeholder="0"
        value={iteration.value}
        unitValue={iteration.unit || defaultOption?.value}
        minValue={1}
        size="medium"
        options={options}
      />
    )
  },
)
