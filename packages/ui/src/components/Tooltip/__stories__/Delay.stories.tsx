import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Tooltip } from '..'
import { Stack } from '../../Stack'

export const Delay = (props: ComponentProps<typeof Tooltip>) => (
  <>
    <Tooltip {...props} delay={{ open: 0 }} text="No delay (instant)">
      <span>Instant</span>
    </Tooltip>
    <Tooltip {...props} delay={{ open: 500, close: 0 }} text="Opens after 500ms">
      <span>500ms open delay</span>
    </Tooltip>
  </>
)

Delay.decorators = [
  Story => (
    <Stack alignItems={'center'} gap={5} style={{ margin: '1rem' }}>
      <Story />
    </Stack>
  ),
] as Decorator[]
