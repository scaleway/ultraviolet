import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { EstimateCost } from '..'

export const NewPrice: StoryFn<ComponentProps<typeof EstimateCost>> = props => (
  <Stack gap={4}>
    <EstimateCost {...props} hideOverlay>
      <EstimateCost.Item label="New server" price={20} noBorder />
    </EstimateCost>

    <EstimateCost
      {...props}
      hideOverlay
      hideTotal
      description={false}
      hideTimeUnit
    >
      <EstimateCost.Item strikeThrough label="Old server" price={10} noBorder />
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
