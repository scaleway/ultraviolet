import type { StoryFn } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const PrefixSuffix: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(10)
  const [price, setPrice] = useState(105)
  const onChange = (newValue: number) => {
    if (newValue && typeof newValue === 'number') {
      setValue(newValue)
      setPrice(newValue * 10 + 30)
    }
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

  return (
    <Stack gap={4}>
      <Slider {...args} suffix="%" label="Suffix" max={100} />
      <Slider {...args} prefix="+" label="Prefix" />
      <Slider
        {...args}
        double
        suffix="GB"
        label="Double"
        value={[15, 70]}
        onChange={() => {}}
      />
      <Slider
        {...args}
        value={value}
        onChange={onChange}
        suffix={suffix}
        label="Interactive label"
      />
    </Stack>
  )
}

PrefixSuffix.args = { value: 34, step: 1, min: 0, max: 100 }

PrefixSuffix.parameters = {
  docs: {
    description: {
      story:
        'Add a prefix and/or a suffix to the values. The component supports custom prefixes and suffixes but please note that prefixes and non-string suffixes are not compatible with prop `input = true` and double sliders.',
    },
  },
}
