import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import ActivityIndicator from '..'
import { colors } from '../../../theme'
import { story, withPropValues, withProps } from '../../../__stories__/utils'

export default {
  component: ActivityIndicator,
  title: 'Components/Feedback/ActivityIndicator',
} as Meta

const Template: Story<ComponentProps<typeof ActivityIndicator>> = args => (
  <ActivityIndicator {...args} />
)
Template.args = {
  label: 'Loading example',
}

export const Default = Template.bind({})

export const Percentages = story(
  Template,
  undefined,
  'You can set the percentage of completion with the `percentage` prop.',
  [withPropValues('percentage', [8, 32, 50, 75, 90, 100])],
)

export const Sizes = story(
  Template,
  undefined,
  'You can set the size of the component with the `size` prop.',
  [withPropValues('size', [8, 32, 50, 75, 90, 100])],
)

export const Colors = story(
  Template,
  { percentage: 75 },
  'You can set the color of the component with the `color` prop.',
  [withPropValues('color', Object.keys(colors))],
)

export const TrailColor = story(
  Template,
  undefined,
  'You can set the trail color (background) of the component by using the `trailColor` prop. You can use theme color or a custom one.',
  [
    withPropValues('trailColor', [
      'white',
      'gray300',
      'gray550',
      'zumthor',
      'shadow',
      'beta',
      'gold',
    ]),
  ],
)

export const StrokeWidth = story(
  Template,
  { percentage: 75 },
  'You can also set the stroke width with the `strokeWidth` prop.',
  [withPropValues('strokeWidth', [2, 8, 16, 24])],
)

export const Text = story(
  Template,
  { percentage: 75, text: '75%' },
  'You can pass a text which will be inlined in the center of the circle with the `text` prop.',
  [
    withProps<ComponentProps<typeof ActivityIndicator>>(
      [0, 25, 50, 75, 100].map(percentage => ({
        percentage,
        text: `${percentage}%`,
      })),
    ),
  ],
)
export const Active = story(
  Template,
  { active: true },
  'You can set the `active` prop to indicate to set the indicator active.',
)
