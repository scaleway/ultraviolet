import type { StoryFn } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Slider } from '..'

export const InteractiveSuffix: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState('10')
  const [price, setPrice] = useState(105)
  const onChange = (newValue: string) => {
    setValue(newValue)
    setPrice(Number(newValue) * 10 + 30)
  }

  const suffix = useMemo(
    () => `GB - ${price}€/month very very long too long`,
    [price],
  )

  return <Slider {...args} value={value} onChange={onChange} suffix={suffix} />
}

InteractiveSuffix.args = { value: '3', step: 1, min: 5, max: 100 }
