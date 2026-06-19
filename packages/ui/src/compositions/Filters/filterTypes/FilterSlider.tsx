import { Slider } from '../../../components/Slider'
import type { FilterConfigItemSlider, FilterComponentProps } from '../types'

type FilterSliderProps = FilterComponentProps<number | number[], FilterConfigItemSlider>

export const FilterSlider = ({ value, onChange, config, hideLabel }: FilterSliderProps) => {
  const sliderProps = {
    input: true,
    'aria-label': hideLabel ? config.label : undefined,
    label: hideLabel ? undefined : config.label,
    max: config.max,
    min: config.min,
    name: config.name,
    onChange,
    options: config.options,
    step: config.step,
    unit: config.unit,
  }

  if (config.double) {
    return <Slider double {...sliderProps} value={value as number[]} />
  }

  return <Slider {...sliderProps} value={value as number} />
}
