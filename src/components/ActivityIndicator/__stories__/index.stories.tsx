import { Meta, Story } from '@storybook/react'
import React from 'react'
import ActivityIndicator, { ActivityIndicatorProps } from '..'
import { colors } from '../../../theme'

export default {
  component: ActivityIndicator,
  title: 'Components/Feedback/ActivityIndicator',
} as Meta

const Template: Story<ActivityIndicatorProps> = args => (
  <ActivityIndicator {...args} />
)

export const Default = Template.bind({})

export const Percentages = Template.bind({})
Percentages.parameters = {
  docs: {
    storyDescription:
      'You can set the percentage of completion with the percentage prop.',
  },
}
Percentages.decorators = [
  () => (
    <>
      {[8, 32, 50, 75, 90, 100].map(percentage => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`percent-${percentage}`}
            percentage={percentage}
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription:
      'You can set the size of the component with the `size` prop.',
  },
}
Sizes.decorators = [
  () => (
    <>
      {[8, 16, 24, 32, 40, 100].map(size => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`size-${size}`}
            percentage={75}
            size={size}
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]

export const Colors = Template.bind({})
Colors.parameters = {
  docs: {
    storyDescription:
      'You can set the size of the component with the `size` prop.',
  },
}
Colors.decorators = [
  () => (
    <>
      {Object.keys(colors).map(color => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`color-${color}`}
            color={color}
            percentage={75}
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]

export const TrailColor = Template.bind({})
TrailColor.parameters = {
  docs: {
    storyDescription:
      'You can set the trail color (background) of the component by using the `trailColor` prop. You can use theme color or a custom one.',
  },
}
TrailColor.decorators = [
  () => (
    <>
      {['white', 'gray300', 'gray550', 'zumthor', 'shadow', 'beta', 'gold'].map(
        color => (
          <div style={{ display: 'inline-flex', marginRight: 8 }}>
            <ActivityIndicator
              key={`trailColor-${color}`}
              trailColor={color}
              percentage={75}
              label="Loading example"
            />
          </div>
        ),
      )}
    </>
  ),
]

export const StrokeWidth = Template.bind({})
StrokeWidth.parameters = {
  docs: {
    storyDescription:
      'You can also set the stroke width with the `strokeWidth` props',
  },
}
StrokeWidth.decorators = [
  () => (
    <>
      {[8, 16, 24, 32, 40, 100].map(size => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`strokeWidth-${size}`}
            percentage={75}
            strokeWidth={size}
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]

export const Text = Template.bind({})
Text.parameters = {
  docs: {
    storyDescription:
      'You can pass a text which will be inlined in the center of the circle with the `text` props',
  },
}
Text.decorators = [
  () => (
    <>
      {[8, 32, 50, 75, 90, 100].map(percentage => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`text-${percentage}`}
            percentage={percentage}
            text={`${percentage}%`}
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]

export const Active = Template.bind({})
Active.parameters = {
  docs: {
    storyDescription:
      'You can set the `active` prop to indicate to set the indicator active',
  },
}
Active.decorators = [
  () => (
    <>
      {[10, 20, 30, 40, 50, 100].map(size => (
        <div style={{ display: 'inline-flex', marginRight: 8 }}>
          <ActivityIndicator
            key={`active-${size}`}
            size={size}
            active
            label="Loading example"
          />
        </div>
      ))}
    </>
  ),
]
