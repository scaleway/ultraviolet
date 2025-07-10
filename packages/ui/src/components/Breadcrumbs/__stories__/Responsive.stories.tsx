import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'

export const Responsive: StoryFn<
  ComponentProps<typeof Breadcrumbs>
> = props => (
  <div
    style={{
      resize: 'both',
      overflow: 'auto',
      border: '1px solid black',
      padding: '10px',
    }}
  >
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item to="/home">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1">Instance</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1/details">Overview</Breadcrumbs.Item>
      <Breadcrumbs.Item to="/products/1/details/1255889966" minWidth="100px">
        Instance Number 1255889966
      </Breadcrumbs.Item>
      <Breadcrumbs.Item onClick={() => {}} minWidth="100px" maxWidth="200px">
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
