import type { StoryFn } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const PrefixSuffix: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(10)
  const [values, setValues] = useState([34, 45])
  const [price, setPrice] = useState(105)
  const [prices, setPrices] = useState([340, 450])
  const onChange = (newValue: number) => {
    setValue(newValue)
    setPrice(newValue * 10 + 30)
  }
  const onChangeDouble = (newValues: number[]) => {
    setValues(newValues)
    setPrices(newValues.map(val => val * 10))
    console.log(newValues)
  }

  const suffix = useMemo(
    () => (
      <Text as="span" variant="bodySmall">
        GB -{' '}
        <Text as="span" variant="bodySmallStrong">
          ${price}€/month
        </Text>
      </Text>
    ),
    [price],
  )

  const suffixDouble = useMemo(
    () => [
      <Text as="span" variant="bodySmall">
        GB -{' '}
        <Text as="span" variant="bodySmallStrong">
          ${prices[0]}€/month
        </Text>
      </Text>,
      <Text as="span" variant="bodySmall">
        GB -{' '}
        <Text as="span" variant="bodySmallStrong">
          ${prices[1]}€/month
        </Text>
      </Text>,
    ],
    [prices],
  )

  return (
    <Stack gap={4}>
      <Slider
        {...args}
        value={34}
        suffix="%"
        label="Suffix"
        max={100}
        onChange={() => {}}
        tooltip={false}
      />
      <Slider {...args} prefix="+" label="Prefix" />
      <Slider
        {...args}
        double
        unit="GB"
        label="Double"
        value={[15, 70]}
        onChange={() => {}}
        tooltip={false}
        suffix={undefined}
      />
      <Slider
        {...args}
        value={value}
        onChange={onChange}
        suffix={suffix}
        label="Interactive label"
        tooltip={false}
      />
      <Slider
        {...args}
        value={values}
        double
        onChange={onChangeDouble}
        suffix={suffixDouble}
        label="Interactive label double!"
        tooltip={false}
      />
      <Slider
        {...args}
        unit="€"
        label="Unit"
        value={53}
        onChange={() => {}}
        tooltip={false}
      />
    </Stack>
  )
}

PrefixSuffix.args = { value: 34, step: 1, min: 0, max: 100 }

PrefixSuffix.parameters = {
  docs: {
    description: {
      story:
        'Add a prefix and/or a suffix to the values. The component supports custom prefixes and suffixes but please note that prefixes and non-string suffixes are not compatible with prop `input = true`. \n Use prop `unit` to add unit to the values. For double slider, non-string suffix must be arrays.',
    },
  },
}
