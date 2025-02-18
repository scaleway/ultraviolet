import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { OrderSummary } from '..'
import {
  categoryAZ,
  categoryDefault,
  categoryM2,
  categoryOptions,
} from './prodcutsExample'

const mockItems = [categoryAZ, categoryM2, categoryOptions, categoryDefault]

export const Template: StoryFn<ComponentProps<typeof OrderSummary>> = props => (
  <OrderSummary {...props} />
)

Template.args = {
  hideTimeUnit: true,
  items: mockItems,
}
