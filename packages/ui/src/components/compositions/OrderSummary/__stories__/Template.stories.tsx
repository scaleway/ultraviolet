import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { OrderSummary } from '..'
import {
  categoryAZ,
  categoryDefault,
  categoryM2,
  categoryOptions,
} from './productsExample'

const mockItems = [categoryAZ, categoryM2, categoryOptions, categoryDefault]

export const Template: StoryFn<ComponentProps<typeof OrderSummary>> = props => (
  <OrderSummary {...props} />
)

Template.args = {
  header: 'Summary',
  items: mockItems,
}
