import type { StoryFn } from '@storybook/react-vite'
import { DateInput } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof DateInput> = args => (
  <Stack gap="2">
    {(['small', 'medium', 'large'] as const).map(size => (
      <DateInput {...args} key={size} label={size} size={size} />
    ))}
  </Stack>
)

Size.args = {
  value: new Date('Sat 24 Dec 2024'),
}
Size.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <StoryComponent />
    </div>
  ),
]
