import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { Stack } from '../../Stack'
import { Slider } from '..'

const options = [
  { label: '1 Mbps', value: 1 },
  { label: '10', value: 10 },
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

export const Options: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(3)
  const [doubleValue, setDoubleValue] = useState([1, 3])

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <Slider
          {...args}
          options={options}
          name="name"
          tooltip={false}
          value={value}
          onChange={setValue}
          label="Custom options"
        />
        Actual input value: {value}
        <br />
        Matched input value with options: {options[value].value}
      </Stack>

      <Stack gap={1}>
        <Slider
          options={options}
          name="name"
          input
          unit="Gbps"
          tooltip={false}
          value={3}
          label="Custom options with unit prop"
        />
      </Stack>

      <Stack gap={1}>
        <Slider
          options={partialOptions}
          name="name"
          input
          unit="Gbps"
          tooltip={false}
          value={3}
          label="Partial options with only the min and max value"
        />
      </Stack>

      <Stack gap={1}>
        <Slider
          name="slider"
          data-testid="slider"
          value={doubleValue}
          double
          unit="Mb"
          options={options}
          onChange={setDoubleValue}
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
            options={options}
            tooltip={false}
            label="Label"
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
