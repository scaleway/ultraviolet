'use client'

import { useTheme } from '@emotion/react'
import type { NodeProps, TooltipProps, TreeMapSvgProps } from '@nivo/treemap'
import { ResponsiveTreeMap } from '@nivo/treemap'
import type { ComponentProps } from 'react'
import { useCallback, useMemo } from 'react'
import { getDataColors } from '../../helpers/treeMap'
import {
  treeMapContentWrapper,
  treeMapForeignObject,
  treeMapRect,
} from './styles.css'
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

  // Custom node renderer to have rounded corners
  const nodeComponent = useCallback(
    ({ node }: NodeComponentProps) => (
      <g transform={`translate(${node.x}, ${node.y})`}>
        {/* Rounded rectangle for the node background */}
        <rect
          className={treeMapRect}
          fill={node.color}
          height={node.height}
          onMouseEnter={node.onMouseEnter}
          onMouseLeave={node.onMouseLeave}
          onMouseMove={node.onMouseMove}
          rx={theme.space[1]}
          ry={theme.space[1]}
          width={node.width}
        />
        {/* foreignObject allows rendering HTML/React content inside SVG */}
        <foreignObject
          className={treeMapForeignObject}
          height={node.height}
          width={node.width}
        >
          <div className={treeMapContentWrapper}>{node.data.content}</div>
        </foreignObject>
      </g>
    ),
    [theme.space],
  )

  return (
    <div className={className} data-testid={dataTestId} style={{ height }}>
      <ResponsiveTreeMap
        animate={false}
        colors={node => colors[node.data.id] || DEFAULT_COLOR}
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
