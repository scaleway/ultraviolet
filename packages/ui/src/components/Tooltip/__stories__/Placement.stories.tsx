import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Tooltip } from '..'
import { Stack } from '../../Stack'

const PLACEMENTS: ComponentProps<typeof Tooltip>['placement'][] = ['auto', 'top', 'bottom', 'left', 'right']

export const Placement = (props: ComponentProps<typeof Tooltip>) =>
  PLACEMENTS.map(placement => (
    <Tooltip key={placement} {...props} placement={placement} text="Hello there">
      Placement on {placement}
    </Tooltip>
  ))

Placement.decorators = [
  Story => (
    <Stack alignItems={'center'} gap={5} style={{ margin: '1rem' }}>
      <Story />
    </Stack>
  ),
] as Decorator[]
