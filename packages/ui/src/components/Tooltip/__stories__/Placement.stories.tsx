import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Tooltip } from '..'

const PLACEMENTS: ComponentProps<typeof Tooltip>['placement'][] = [
  'auto',
  'top',
  'bottom',
  'left',
  'right',
]

export const Placement = (props: ComponentProps<typeof Tooltip>) =>
  PLACEMENTS.map(placement => (
    <Tooltip
      key={placement}
      {...props}
      placement={placement}
      text="Hello there"
    >
      Placement on {placement}
    </Tooltip>
  ))

Placement.decorators = [
  Story => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 38,
        height: '250px',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  ),
] as Decorator[]
