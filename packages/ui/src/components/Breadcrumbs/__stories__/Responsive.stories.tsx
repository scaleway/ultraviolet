import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'

export const Responsive: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => (
  <div
    style={{
      border: '1px solid black',
      overflow: 'auto',
      padding: '10px',
      resize: 'both',
    }}
  >
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item to="/home">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1">Instance</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1/details">Overview</Breadcrumbs.Item>
      <Breadcrumbs.Item minWidth="100px" to="/products/1/details/1255889966">
        Instance Number 1255889966
      </Breadcrumbs.Item>
      <Breadcrumbs.Item maxWidth="200px" minWidth="100px" onClick={() => {}}>
        Instance Number 1255889966 IP Address
      </Breadcrumbs.Item>
    </Breadcrumbs>
  </div>
)

Responsive.parameters = {
  docs: {
    description: {
      story:
        'You can easily customize the responsive behavior of breadcrumbs by using the `minWidth` and `maxWidth` props. When setting `minWidth` the item will reduce its size to fit within the specified width, and when setting `maxWidth` the item will expand to fit within the specified width. If there is not more space available, items will go on another line.',
    },
  },
}
