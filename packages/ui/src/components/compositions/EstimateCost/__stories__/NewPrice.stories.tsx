import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { EstimateCost } from '..'
import { Stack } from '../../../Stack'

export const NewPrice: StoryFn<ComponentProps<typeof EstimateCost>> = props => (
  <Stack gap={4}>
    <EstimateCost {...props} hideOverlay>
      <EstimateCost.Item label="New server" noBorder price={20} />
    </EstimateCost>

    <EstimateCost
      {...props}
      description={false}
      hideOverlay
      hideTimeUnit
      hideTotal
    >
      <EstimateCost.Item label="Old server" noBorder price={10} strikeThrough />
    </EstimateCost>
  </Stack>
)

NewPrice.parameters = {
  docs: {
    description: {
      story: '',
    },
  },
}
