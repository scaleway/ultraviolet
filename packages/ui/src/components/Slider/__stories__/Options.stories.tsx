import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { Stack } from '../../Stack'
import { Slider } from '..'
import { Text } from '../../Text'

const options = [
  { label: '1 Mbps', value: 1 },
  { label: '10', value: 10 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '500', value: 500 },
  { label: '1 Gbps', value: 1000 },
]

const optionsWithout10 = [
  { label: '1 Mbps', value: 1 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '500', value: 500 },
  { label: '1 Gbps', value: 1000 },
]

const partialOptions = [
  { label: '1 Mbps', value: 1 },
  { label: '', value: 10 },
  { label: '', value: 100 },
  { label: '', value: 200 },
  { label: '', value: 500 },
  { label: '1 Gbps', value: 1000 },
]

const partialOptionsDefaultScale = [
  { label: '1 Mbps', value: 0 },
  { label: '1 Gbps', value: 1000 },
  { label: '200 Mbps', value: 200 },
]

export const Options: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(3)
  const [value2, setValue2] = useState(3)

  const [doubleValue, setDoubleValue] = useState([1, 3])
  const [valueUnscaled, setSalueUnscaled] = useState(100)
  const [valueUnscaledDouble, setSalueUnscaledDouble] = useState([100, 300])

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <Slider
          {...args}
          label="Custom options"
          name="name"
          onChange={setValue}
          options={options}
          tooltip={false}
          value={value}
        />
        Actual input value: {value}
        <br />
        Matched input value with options: {options[value].value}
      </Stack>

      <Stack gap={1}>
        <Slider
          {...args}
          defaultScale
          label="Custom options"
          labelDescription={
            <Text as="p" variant="captionSmall">
              defaultScale=true
            </Text>
          }
          max={1000}
          name="name"
          onChange={setValue2}
          options={optionsWithout10}
          tooltip={false}
          value={value2}
        />
        Actual input value: {value2}
        <br />
        Matched input value with options: {options[value2]?.value}
      </Stack>
      <Stack gap={1}>
        <Slider
          input
          label="Custom options with unit prop"
          name="name"
          options={options}
          tooltip={false}
          unit="Gbps"
          value={3}
        />
      </Stack>

      <Stack gap={1}>
        <Slider
          label="Partial options with only the min and max value"
          labelDescription={
            <Text as="p" variant="captionSmall">
              defaultScale=false (here, step of 1 and min=0, max=options.length,
              those values are automatically computed by the component)
            </Text>
          }
          name="name"
          options={partialOptions}
          tooltip={false}
          unit="Gbps"
          value={3}
        />
      </Stack>
      <Stack gap={1}>
        <Slider
          customValueDisplay={
            valueUnscaled === 1000 || valueUnscaled === 0 ? (
              <Text as="span" variant="bodySmall">
                {partialOptionsDefaultScale[valueUnscaled === 0 ? 0 : 1].label}
              </Text>
            ) : undefined
          }
          defaultScale
          label="Partial options with only the min and max value"
          labelDescription={
            <Text as="p" variant="captionSmall">
              defaultScale=true (here, step of 100 and min=0, max=1000, those
              value come from the props)
            </Text>
          }
          max={1000}
          min={0}
          name="name"
          onChange={setSalueUnscaled}
          options={partialOptionsDefaultScale}
          step={100}
          tooltip={false}
          unit={valueUnscaled === 1000 ? 'Gbps' : 'Mbps'}
          value={valueUnscaled}
        />
      </Stack>
      <Stack gap={1}>
        <Slider
          defaultScale
          double
          label="Partial options with only the min and max value"
          labelDescription={
            <Text as="p" variant="captionSmall">
              defaultScale=true & double (here, step of 100 and min=0, max=1000,
              those value come from the props)
            </Text>
          }
          max={1000}
          min={0}
          name="name"
          onChange={setSalueUnscaledDouble}
          options={partialOptionsDefaultScale}
          step={100}
          tooltip={false}
          unit="Mbps"
          value={valueUnscaledDouble}
        />
      </Stack>

      <Stack gap={1}>
        <Slider
          data-testid="slider"
          double
          name="slider"
          onChange={setDoubleValue}
          options={options}
          unit="Mb"
          value={doubleValue}
        />
        Actual input value: [{doubleValue[0]}, {doubleValue[1]}]
        <br />
        Matched input value with options: [{options[doubleValue[0]].value},
        {options[doubleValue[1]].value}]
      </Stack>

      <Stack width="25%">
        <Modal disclosure={<Button>Open modal</Button>}>
          <Slider
            {...args}
            label="Label"
            options={options}
            tooltip={false}
            unit="Gbps"
          />
        </Modal>
      </Stack>
    </Stack>
  )
}

Options.args = {
  label: 'Label',
}

Options.parameters = {
  docs: {
    description: {
      story:
        'If you need to add a label under your Slider you can use `options` props. Alternatively, when you need a non linear scale (e.g. 0.5, 1, 3, 5, 10), you can use the `options` prop also.\n\n When using options, the value of the Slider will be the index of the selected option, so you can use the `value` prop to get the actual value.',
    },
  },
}
