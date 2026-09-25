import type { Decorator, StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Popup } from '../index'
import { Panel } from './Panel'

const PLACEMENTS: ComponentProps<typeof Popup>['placement'][] = [
  'top',
  'right',
  'bottom',
  'left',
  'auto',
  'auto-top',
  'auto-bottom',
  'auto-left',
  'auto-right',
]

export const Placement: StoryFn<typeof Popup> = () => (
  <Stack gap={5} width="100%" alignItems="center">
    {PLACEMENTS.map(placement => (
      <Popup
        debounceDelay={0}
        key={placement}
        placement={placement}
        text={
          <Panel title={`Placement: ${placement}`}>
            The &apos;auto&apos; variants flip the popup when it does not fit.
          </Panel>
        }
      >
        <Button sentiment="neutral" variant="outlined">
          {placement}
        </Button>
      </Popup>
    ))}
  </Stack>
)

Placement.decorators = [
  Story => (
    <div style={{ height: '500px', overflow: 'auto', padding: '2rem 1rem 1rem' }}>
      <Stack alignItems="center" gap={5}>
        <Story />
      </Stack>
    </div>
  ),
] as Decorator[]

Placement.parameters = {
  docs: {
    description: {
      story:
        'The current API uses custom placement values: `top`, `right`, `bottom`, `left` plus `auto` prefixed variants and a special `nested-menu` value. The planned API will use the `@floating-ui/react` placement format (`top` | `bottom` | `bottom-start` | ...) and auto-flip with a `flip()` middleware, removing the `auto-*` variants and the separate `align` prop.',
    },
  },
}
