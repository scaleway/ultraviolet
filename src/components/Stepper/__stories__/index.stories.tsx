import { Meta, Story } from '@storybook/react'
import React, { ComponentProps, useState } from 'react'
import Stepper, { containerSizesKeys } from '..'

export default {
  component: Stepper,
  title: 'Components/Data Display/Stepper',
} as Meta

const Template: Story<ComponentProps<typeof Stepper>> = args => {
  const [value, setValue] = useState(0)

  return (
    <Stepper
      minValue={0}
      maxValue={100}
      onChange={val => typeof val === 'number' && setValue(val)}
      value={value}
      width={200}
      {...args}
    />
  )
}

export const Default = Template.bind({})

export const Text = Template.bind({})
Text.parameters = {
  docs: {
    storyDescription:
      'You can change text inside stepper by using `text` prop. You can pass directly a text or a component.',
  },
}
Text.decorators = [
  () => {
    const [value, setValue] = useState(0)

    return (
      <Stepper
        minValue={0}
        maxValue={100}
        text="GB"
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        width={200}
      />
    )
  },
]

export const Steps = Template.bind({})
Steps.parameters = {
  docs: {
    storyDescription:
      'You can change step size of your `Stepper` component. If you set it to 10 for example, your `Stepper` will increase & decrease by steps of 10.',
  },
}
Steps.decorators = [
  () => {
    const [value, setValue] = useState(0)

    return (
      <Stepper
        minValue={0}
        maxValue={100}
        step={10}
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        width={200}
      />
    )
  },
]

export const Sizes = Template.bind({})
Sizes.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {containerSizesKeys.map(size => {
        const [value, setValue] = useState(10)

        return (
          <div key={size}>
            {size}
            <Stepper
              minValue={0}
              maxValue={100}
              size={size}
              onChange={val => typeof val === 'number' && setValue(val)}
              value={value}
              width={200}
            />
          </div>
        )
      })}
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.decorators = [
  () => (
    <Stepper
      minValue={0}
      maxValue={100}
      value={10}
      disabled
      width={200}
      text="GB"
    />
  ),
]

export const Events = Template.bind({})
Events.decorators = [
  () => (
    <Stepper
      minValue={50}
      maxValue={100}
      value={50}
      onChange={() => console.log('onChange')}
      onFocus={() => console.log('onFocus')}
      onBlur={() => console.log('onBlur')}
      onMinCrossed={() => console.log('onMinCrossed')}
      onMaxCrossed={() => console.log('onMaxCrossed')}
      width={200}
    />
  ),
]
