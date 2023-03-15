import type { ComponentStory } from '@storybook/react'
import { RowV2 } from '..'

export const Template: ComponentStory<typeof RowV2> = ({ ...props }) => (
  <RowV2 {...props} templateColumns="3fr 6fr 3fr">
    <div style={{ backgroundColor: '#eee' }}>3fr | 3/12</div>
    <div style={{ backgroundColor: '#eee' }}>6fr | 6/12</div>
    <div style={{ backgroundColor: '#eee' }}>3fr | 3/12</div>
  </RowV2>
)
