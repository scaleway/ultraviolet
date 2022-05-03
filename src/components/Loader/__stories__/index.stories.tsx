import { Meta } from '@storybook/react'
import { ComponentProps } from 'react'
import Loader from '..'
import { story, withPropValues, withProps } from '../../../__stories__/utils'
import { colors } from '../../../theme'

export default {
  component: Loader,
  title: 'Components/Feedback/Loader',
} as Meta

type ActivitiIndicatorProps = ComponentProps<typeof Loader>

export const Template = story<ActivitiIndicatorProps>({
  label: 'Loading example',
})

export const Percentages = story<ActivitiIndicatorProps>(
  Template.args,
  'You can set the percentage of completion with the `percentage` prop.',
  [withPropValues('percentage', [8, 32, 50, 75, 90, 100])],
)

export const Sizes = story<ActivitiIndicatorProps>(
  Template.args,
  'You can set the size of the component with the `size` prop.',
  [withPropValues('size', [8, 32, 50, 75, 90, 100])],
)

const examplesColors = [...Object.keys(colors), 'tomato', '#6EB5FF']

export const Colors = story<ActivitiIndicatorProps>(
  { ...Template.args, percentage: 75 },
  'You can set the color of the component with the `color` prop.',
  [withPropValues('color', examplesColors)],
)

export const TrailColor = story<ActivitiIndicatorProps>(
  Template.args,
  'You can set the trail color (background) of the component by using the `trailColor` prop. You can use theme color or a custom one.',
  [withPropValues('trailColor', examplesColors)],
)

export const StrokeWidth = story<ActivitiIndicatorProps>(
  { ...Template.args, percentage: 75 },
  'You can also set the stroke width with the `strokeWidth` prop.',
  [withPropValues('strokeWidth', [2, 8, 16, 24])],
)

export const Text = story<ActivitiIndicatorProps>(
  Template.args,
  'You can pass a text which will be inlined in the center of the circle with the `text` prop.',
  [
    withProps<ActivitiIndicatorProps>(
      [0, 25, 50, 75, 100].map(percentage => ({
        percentage,
        text: `${percentage}%`,
      })),
    ),
  ],
)
export const Active = story<ActivitiIndicatorProps>(
  { ...Template.args, active: true },
  'You can set the `active` prop to indicate to set the indicator active.',
)
