'use client'

import type { NodeProps, TooltipProps, TreeMapSvgProps } from '@nivo/treemap'
import { ResponsiveTreeMapHtml } from '@nivo/treemap'
import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps } from 'react'
import { useCallback, useMemo } from 'react'
import { getDataColors } from '../../helpers/treeMap'
import { Text } from '../Text'
import { treeMapContentWrapper } from './styles.css'
import { Tooltip } from './Tooltip'
import type { DataType } from './types'

type NodeComponentProps = NodeProps<DataType>

type TreeMapChartProps = {
  height?: string | number
  data: DataType
  className?: string
  tooltipFunction?: (
    props: TooltipProps<DataType>['node']['data'],
  ) => ComponentProps<typeof Tooltip>
  chartProps?: Partial<TreeMapSvgProps<DataType>>
  'data-testid'?: string
}

/**
 * TreeMapChart component is used to display data in a TreeMap chart format. It uses the Nivo library under the hood.
 * See https://nivo.rocks/treemap/ for more information.
 */
export const TreeMapChart = ({
  height = '537px', // maintains aspect ratio based on standard 1074px width
  data,
  tooltipFunction,
  chartProps,
  className,
  'data-testid': dataTestId,
}: TreeMapChartProps) => {
  const theme = useTheme()

  const DEFAULT_COLOR = theme.colors.primary.text

  // Generate color mapping for each data node
  const colors = useMemo(() => getDataColors(data, theme), [data, theme])

  // Custom tooltip renderer - uses provided function or defaults to showing content and value
  const tooltip = useCallback(
    (props: TooltipProps<DataType>) => {
      const { value, content } = tooltipFunction
        ? tooltipFunction(props.node.data)
        : { content: props.node.data.content, value: props.node.data.value }

      return <Tooltip content={content} value={value} />
    },
    [tooltipFunction],
  )

  // Custom node renderer
  const nodeComponent = useCallback(
    ({ node }: NodeComponentProps) => {
      const backgroundColor = colors[node.data.id] || DEFAULT_COLOR
      const spacing = 4 // spacing in pixels between boxes

      return (
        <div
          className={treeMapContentWrapper}
          onMouseEnter={node.onMouseEnter}
          onMouseLeave={node.onMouseLeave}
          onMouseMove={node.onMouseMove}
          style={{
            backgroundColor,
            height: node.height - spacing,
            left: node.x + spacing / 2,
            top: node.y + spacing / 2,
            width: node.width - spacing,
          }}
        >
          <Text as="div" oneLine variant="captionStrong">
            {node.data.content}
          </Text>
        </div>
      )
    },
    [colors, DEFAULT_COLOR],
  )

  return (
    <div className={className} data-testid={dataTestId} style={{ height }}>
      <ResponsiveTreeMapHtml
        animate={false}
        data={data}
        enableParentLabel={false}
        identity="id"
        labelSkipSize={0}
        leavesOnly // only show leaf nodes, not parent containers
        motionConfig="none"
        nodeComponent={nodeComponent}
        orientLabel={false}
        tile="squarify" // algorithm that creates more square-like rectangles
        tooltip={tooltip}
        value="value"
        {...chartProps}
      />
    </div>
  )
}
