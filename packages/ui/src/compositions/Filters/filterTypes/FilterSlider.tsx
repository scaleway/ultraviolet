import { Slider } from '../../../components/Data Entry/Slider'
import type { FilterComponentProps, FilterConfigItemSlider } from '../types'

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
    labelDescription: hideLabel ? undefined : config.labelDescription,
  }

  if (config.double && typeof value !== 'number') {
    return <Slider double {...sliderProps} value={value} />
  }

  if (config.double !== true && typeof value === 'number') {
    return <Slider {...sliderProps} value={value} />
  }

  return null
}
