import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import SelectNumber, { containerSizesKeys } from '..'

const StyledDiv = styled.div`
  min-width: 200px;
  width: fit-content;
`

export default {
  component: SelectNumber,
  title: 'Components/Data Display/SelectNumber',
  decorators: [
    StoryComponent => (
      <StyledDiv>
        <StoryComponent />
      </StyledDiv>
    ),
  ],
} as Meta

const Template: Story<ComponentProps<typeof SelectNumber>> = args => {
  const [value, setValue] = useState(0)

  return (
    <SelectNumber
      minValue={0}
      onChange={val => typeof val === 'number' && setValue(val)}
      value={value}
      {...args}
    />
  )
}

export const Default = Template.bind({})

export const Text = Template.bind({})
Text.parameters = {
  docs: {
    storyDescription:
      'You can change text inside SelectNumber by using `text` prop. You can pass directly a text or a component.',
  },
}
Text.decorators = [
  () => {
    const [value, setValue] = useState(0)

    return (
      <SelectNumber
        minValue={0}
        maxValue={100}
        text="GB"
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
      />
    )
  },
]

export const DisabledTooltip = Template.bind({})
DisabledTooltip.parameters = {
  docs: {
    storyDescription:
      'You can add a tooltip on left and rights button by using `disabledTooltip` prop. Try to hover on the "-" and "+".',
  },
}
DisabledTooltip.decorators = [
  () => {
    const [value, setValue] = useState(0)

    return (
      <SelectNumber
        minValue={0}
        maxValue={1}
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        disabledTooltip="This is the content of the disabled tooltip"
      />
    )
  },
]

export const Steps = Template.bind({})
Steps.parameters = {
  docs: {
    storyDescription:
      'You can change step size of your `SelectNumber` component. If you set it to 10 for example, your `SelectNumber` will increase & decrease by steps of 10.',
  },
}
Steps.decorators = [
  () => {
    const [value, setValue] = useState(0)

    return (
      <SelectNumber
        minValue={0}
        maxValue={100}
        step={10}
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
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
            <SelectNumber
              minValue={0}
              maxValue={100}
              size={size}
              onChange={val => typeof val === 'number' && setValue(val)}
              value={value}
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
    <SelectNumber minValue={0} maxValue={100} value={10} disabled text="GB" />
  ),
]

export const Events = Template.bind({})
Events.decorators = [
  () => (
    <SelectNumber
      minValue={50}
      maxValue={100}
      value={50}
      onChange={() => console.log('onChange')}
      onFocus={() => console.log('onFocus')}
      onBlur={() => console.log('onBlur')}
      onMinCrossed={() => console.log('onMinCrossed')}
      onMaxCrossed={() => console.log('onMaxCrossed')}
    />
  ),
]
