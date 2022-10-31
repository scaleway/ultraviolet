import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Tooltip from '..'

export const Placement = (props: ComponentProps<typeof Tooltip>) =>
  ['auto', 'top', 'bottom', 'left', 'right'].map(placement => (
    <Tooltip
      {...props}
      key={placement}
      placement={placement as ComponentProps<typeof Tooltip>['placement']}
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
] as DecoratorFunction<JSX.Element>[]
