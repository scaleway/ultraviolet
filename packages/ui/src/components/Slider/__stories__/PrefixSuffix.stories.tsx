import type { StoryFn } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Slider } from '..'

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
      <Text as="span" key="first suffix" variant="bodySmall">
        GB -{' '}
        <Text as="span" variant="bodySmallStrong">
          ${prices[0]}€/month
        </Text>
      </Text>,
      <Text as="span" key="second suffix" variant="bodySmall">
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
        customValueDisplay={
          <Text as="p" variant="bodySmallStrong">
            This is a custom value
          </Text>
        }
        label="With custom value"
        max={100}
        onChange={() => {}}
        tooltip={false}
        value={34}
      />
      <Slider
        customValueDisplay={
          <Text as="p" variant="bodySmallStrong">
            This is a custom value
          </Text>
        }
        double
        label="Double with custom value"
        onChange={() => {}}
        suffix={undefined}
        tooltip={false}
        unit="GB"
        value={[15, 70]}
      />
      <Slider
        {...args}
        label="Suffix"
        max={100}
        onChange={() => {}}
        suffix="%"
        tooltip={false}
        value={34}
      />
      <Slider {...args} label="Prefix" prefix="+" />
      <Slider
        {...args}
        double
        label="Double"
        onChange={() => {}}
        suffix={undefined}
        tooltip={false}
        unit="GB"
        value={[15, 70]}
      />
      <Slider
        {...args}
        label="Interactive label"
        onChange={onChange}
        suffix={suffix}
        tooltip={false}
        value={value}
      />
      <Slider
        {...args}
        double
        label="Interactive label double!"
        onChange={onChangeDouble}
        suffix={suffixDouble}
        tooltip={false}
        value={values}
      />
      <Slider
        {...args}
        label="Unit"
        onChange={() => {}}
        tooltip={false}
        unit="€"
        value={53}
      />
    </Stack>
  )
}

PrefixSuffix.args = { max: 100, min: 0, step: 1, value: 34 }

PrefixSuffix.parameters = {
  docs: {
    description: {
      story:
        'Add a prefix and/or a suffix to the values. The component supports custom prefixes and suffixes but please note that prefixes and non-string suffixes are not compatible with prop `input = true`. \n Use prop `unit` to add unit to the values. For double slider, non-string suffix must be arrays. It is also possible to completely replace the value with a `customValue`. If both a `customValue` and a suffix/prefix is defined, only the `customValue` will be shown for a single slider.',
    },
  },
}
