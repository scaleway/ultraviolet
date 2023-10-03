import { useMemo } from 'react'
import { UnitInput } from './UnitInput'
import type { Iteration, Units } from './types'
import { useEstimateCost } from './EstimateCostProvider'

type CustomUnitInputProps = {
  defaultTimeUnit?: Units
  setIteration: (iteration: Iteration) => void
  iteration: Iteration
  timeUnits: Units[]
}

export const CustomUnitInput = ({
  defaultTimeUnit = 'hours',
  setIteration,
  iteration,
  timeUnits,
}: CustomUnitInputProps) => {
  const { t } = useEstimateCost()

  const options = useMemo(
    () =>
      timeUnits.map(unit => ({
        value: unit,
        label: t(`estimate.cost.units.${unit}.label`, {
          count: iteration.value,
        }),
      })),
    [timeUnits, t, iteration.value],
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
      selectInputWidth={300}
    />
  )
}
