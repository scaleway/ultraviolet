import type { StoryFn } from '@storybook/react-vite'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const MinMax: StoryFn<typeof Slider> = () => (
  <Stack gap={4}>
    <Slider label="Label" value={60} min={60} />
    <Slider label="Label" value={80} min={60} />
    <Slider label="Label" value={100} max={80} />
    <Slider double label="Label" value={[40, 60]} min={40} />
    <Slider double label="Label" value={[40, 60]} min={20} max={80} />
    <Slider double label="Label" value={[50, 80]} min={20} max={80} />
  </Stack>
)
