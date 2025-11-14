import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { ReactNode, useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { TreeMapChart } from '..'
import {
  treeMapChartSimpleData,
  treeMapChartWithCustomContentData,
} from '../__stories__/mockData'
import { DataType } from '../types'

type MockedNodeType = {
  color: string
  data: DataType
  height: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  onMouseMove: () => void
  width: number
  x: number
  y: number
}

type MockedResponsiveTreeMapHtmlType = {
  data: DataType
  nodeComponent?: (props: { node: unknown }) => ReactNode
  tooltip?: (props: { node: unknown }) => ReactNode
}

// ResponsiveTreeMapHtml is mocked because Nivo's HTML rendering doesn't produce an output
// in jsdom. The actual component relies on DOM measurements and complex calculations
// that don't work properly in tests.
// This mock renders a simplified but predictable structure that represents the data
// accurately for snapshot testing
vi.mock('@nivo/treemap', () => ({
  ResponsiveTreeMapHtml: ({
    data,
    nodeComponent,
    tooltip,
  }: MockedResponsiveTreeMapHtmlType) => {
    const [hoveredNode, setHoveredNode] = useState<MockedNodeType | null>(null)

    return (
      <>
        <div
          data-testid="treemap-mock"
          style={{ height: '500px', position: 'relative', width: '1000px' }}
        >
          {/* eslint-disable-next-line testing-library/no-node-access */}
          {data.children?.map((child: DataType, index: number) => {
            const mockNode = {
              color: '#641cb3',
              data: child,
              height: 100,
              onMouseEnter: () => setHoveredNode(mockNode),
              onMouseLeave: () => setHoveredNode(null),
              onMouseMove: () => {},
              width: 100,
              x: index * 100,
              y: 0,
            }

            return (
              <div data-testid={`node-${child.id}`} key={child.id}>
                {nodeComponent?.({ node: mockNode })}
              </div>
            )
          })}
        </div>
        {/* Render tooltip when a node is hovered */}
        {hoveredNode && tooltip?.({ node: hoveredNode })}
      </>
    )
  },
}))

describe('treeMapChart', () => {
  test('renders correctly with data', () => {
    const { asFragment } = renderWithTheme(
      <TreeMapChart data={treeMapChartSimpleData} />,
      consoleLightTheme,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders complex content with React components', () => {
    const { asFragment } = renderWithTheme(
      <TreeMapChart data={treeMapChartWithCustomContentData} />,
      consoleLightTheme,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with custom height', () => {
    const { container } = renderWithTheme(
      <TreeMapChart data={treeMapChartSimpleData} height="400px" />,
      consoleLightTheme,
    )

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const chartContainer = container.querySelector('[style*="height"]')
    expect(chartContainer).toHaveStyle({ height: '400px' })
  })

  test('renders with custom tooltip function', async () => {
    const tooltipFunction = vi.fn(data => ({
      content: `Custom: ${data.content}`,
      value: data.value * 2,
    }))

    const { container } = renderWithTheme(
      <TreeMapChart
        data={treeMapChartSimpleData}
        tooltipFunction={tooltipFunction}
      />,
      consoleLightTheme,
    )

    // Find the first node element (treemap node)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const node = container.querySelector('[data-testid^="node-"] > div')
    expect(node).toBeInTheDocument()

    // Hover over the node to trigger tooltip
    await userEvent.hover(node!)

    // Verify tooltip function was called
    expect(tooltipFunction).toHaveBeenCalled()
    expect(tooltipFunction).toHaveBeenCalledWith(
      expect.objectContaining(
        // eslint-disable-next-line testing-library/no-node-access
        treeMapChartSimpleData.children[0],
      ),
    )

    // Check that tooltip is visible with custom content
    expect(screen.getByText(/Custom: Compute/i)).toBeInTheDocument()
    expect(screen.getByText(/20/i)).toBeInTheDocument() // value * 2
  })
})
