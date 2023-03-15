import type { Story } from '@storybook/react'
import { RowV2 } from '..'
import { Separator, Stack } from '../..'

export const AlignItems: Story = () => (
  <Stack gap={2}>
    <RowV2 templateColumns="repeat(3, 1fr)">
      <div style={{ height: '100px', backgroundColor: '#eee' }}>
        100px height & default align
      </div>
      <div style={{ height: '50px', backgroundColor: '#eee' }}>
        50px height & default align
      </div>
      <div style={{ backgroundColor: '#eee' }}>auto height & default align</div>
    </RowV2>
    <Separator />
    <RowV2 templateColumns="repeat(3, 1fr)" alignItems="center">
      <div style={{ height: '100px', backgroundColor: '#eee' }}>
        100px height & align center
      </div>
      <div style={{ height: '50px', backgroundColor: '#eee' }}>
        50px height & align center
      </div>
      <div style={{ backgroundColor: '#eee' }}>auto height & align center</div>
    </RowV2>
  </Stack>
)

AlignItems.parameters = {
  docs: {
    storyDescription:
      'You can use the prop `alignItems` to align each row elements',
  },
}
