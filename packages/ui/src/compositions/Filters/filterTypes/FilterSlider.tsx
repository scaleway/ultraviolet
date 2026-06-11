import { Slider } from '../../../components/Slider'
import type { FilterConfigItemSlider, FilterComponentProps } from '../types'

type FilterSliderProps = FilterComponentProps<number | number[], FilterConfigItemSlider>

export const FilterSlider = ({ value, onChange, config, hideLabel }: FilterSliderProps) => (
  // @ts-expect-error the Slider is a bit too strict with the type of the value for this use case
  <Slider
    double={config.double}
    input
    aria-label={hideLabel ? config.label : undefined}
    label={hideLabel ? undefined : config.label}
    max={config.max}
    min={config.min}
    name={config.name}
    onChange={onChange}
    options={config.options}
    step={config.step}
    unit={config.unit}
    value={value}
  />
)
